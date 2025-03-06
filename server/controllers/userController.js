const User = require('../models/User');
// const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

// @route   GET /api/users
// @desc    Get all users (with pagination)
// @access  Super Admin only
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination params
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-password'); // Exclude passwords

    res.json({ users, currentPage: page, perPage: limit });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Super Admin, Admin (only users under their restaurant)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Admins can only access users in their restaurants
    if (req.user.role === 'admin' && !user.restaurants.some(r => req.user.restaurants.includes(r))) {
      return res.status(403).json({ error: 'Forbidden: You can only view your restaurant users' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/users/invite
// @desc    Invite a Manager (send email invitation)
// @access  Admin only
const inviteManager = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'User already exists' });
  
      // Generate invitation link (token-based, for security)
      const inviteToken = jwt.sign({ email, role: 'manager' }, process.env.JWT_SECRET, { expiresIn: '48h' });
      const inviteLink = `${process.env.CLIENT_URL}/register?token=${inviteToken}`;
  
      // Email content
      const emailContent = `
        <h3>You're Invited as a Manager!</h3>
        <p>Hello,</p>
        <p>An admin has invited you to join as a Manager.</p>
        <p>Click the link below to complete your registration:</p>
        <a href="${inviteLink}" target="_blank">Complete Registration</a>
        <p>This link will expire in 48 hours.</p>
      `;
  
      // Send the invitation email
      await sendEmail(email, 'Manager Invitation', emailContent);
  
      res.json({ message: 'Invitation sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

// @route   PUT /api/users/:id
// @desc    Update user details (role, allergies, etc.)
// @access  Super Admin, Admin (only their users)
const updateUser = async (req, res) => {
  try {
    const { role, allergies } = req.body;
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Only Super Admin can change roles
    if (role && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only Super Admin can change roles' });
    }

    // Admins can only update their own restaurant users
    if (req.user.role === 'admin' && !user.restaurants.some(r => req.user.restaurants.includes(r))) {
      return res.status(403).json({ error: 'Forbidden: You can only update your restaurant users' });
    }

    // Update user
    if (role) user.role = role;
    if (allergies) user.allergies = allergies;
    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Super Admin only
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  inviteManager,
  updateUser,
  deleteUser,
};
