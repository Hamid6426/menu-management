const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto"); // For generating reset tokens

exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username: regexedEmail,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin who will create a restaurant later
    const newAdmin = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: `Admin registered successfully` });
  } catch (error) {
    console.error("Admin Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Removed role from destructuring

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate Token (using role from DB)
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role, // Role from DB
        allergies: user.allergies,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forgot Password (Send Reset Email)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token temporarily (should be saved in DB with expiry in a real-world app)
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpire = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send Email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const htmlContent = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    try {
      await sendEmail(email, "Password Reset Request", htmlContent);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
      user.resetPasswordToken = null;
      user.resetPasswordTokenExpire = null;
      await user.save();
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const { resetToken } = req.params;

    if (!email || !resetToken || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user || user.resetPasswordToken !== resetToken || user.resetPasswordTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear reset token
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;

    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
