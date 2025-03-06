const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token valid for 7 days
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user (Admin & Super Admin only)
// @access  Super Admin, Admin
const register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    // Only allow Super Admin or Admin to create users
    if (!['superadmin', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Only admins can register users' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/auth/login
// @desc    User login (returns JWT token)
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Generate token
    const token = generateToken(user);

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/auth/logout
// @desc    Logout (clear JWT cookie)
// @access  Authenticated Users
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Generate reset token (Here, we're using JWT for simplicity)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Here, you would send an email with the reset token (not implemented)
    console.log(`Password reset link: ${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/auth/register
// @desc    Register a new user (Admin/Super Admin can register manually, or users can register via invite token)
// @access  Super Admin, Admin (manual) | Public (if invited)
const registerManager = async (req, res) => {
    try {
      const { name, email, password, role, token } = req.body;
  
      // If a token is provided, validate it (for invited managers)
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded.email !== email || decoded.role !== 'manager') {
            return res.status(400).json({ error: 'Invalid or expired invitation token' });
          }
        } catch (error) {
          return res.status(400).json({ error: 'Invalid or expired invitation token' });
        }
      } else {
        // Manual registration requires Super Admin/Admin access
        if (!['superadmin', 'admin'].includes(req.user?.role)) {
          return res.status(403).json({ error: 'Forbidden: Only admins can manually register users' });
        }
      }
  
      // Check if the user already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'Email already in use' });
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user with provided role (or default 'manager' if invited)
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: token ? 'manager' : role, // Ensure invited users get 'manager' role
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // @route   POST /api/auth/register
// @desc    Register a new user (Admin/Super Admin can register manually, or users can register via invite token)
// @access  Super Admin, Admin (manual) | Public (if invited/self-registering as user)
const newregister = async (req, res) => {
    try {
      const { name, email, password, role, token } = req.body;
  
      // Check if user already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'Email already in use' });
  
      let assignedRole = 'user'; // Default role for self-registration
  
      // If a token is provided, validate it (for invited managers)
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded.email !== email) {
            return res.status(400).json({ error: 'Invalid or expired invitation token' });
          }
          assignedRole = decoded.role; // Assign role from the token
        } catch (error) {
          return res.status(400).json({ error: 'Invalid or expired invitation token' });
        }
      } else {
        // Manual registration requires authentication
        if (!req.user || !['superadmin', 'admin'].includes(req.user.role)) {
          return res.status(403).json({ error: 'Forbidden: Only Super Admins/Admins can manually register users' });
        }
  
        // Super Admins can assign any role; Admins can only assign Managers & Users
        if (req.user.role === 'superadmin') {
          assignedRole = role || 'user'; // Allow Super Admin to define the role
        } else if (req.user.role === 'admin') {
          if (role && role !== 'manager' && role !== 'user') {
            return res.status(403).json({ error: 'Admins can only create Managers or Users' });
          }
          assignedRole = role || 'user';
        }
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user with the assigned role
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: assignedRole,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
