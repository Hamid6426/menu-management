const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("User registration request received for email:", email); // Do not log password or full request body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const regexedEmail = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const newUser = new User({
      name,
      username: regexedEmail,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    console.log("User registered successfully:", { name: newUser.name, email: newUser.email });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    console.log("Admin registration request received for email:", email);

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin registered successfully:", { name: newAdmin.name, email: newAdmin.email });
    res.status(201).json({ message: `Admin registered successfully` });
  } catch (error) {
    console.error("Admin Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received for email:", email); // Do not log password

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        allergies: user.allergies,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("User logged in successfully:", { name: user.name, email: user.email });
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password request received for email:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const htmlContent = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    try {
      await sendEmail(email, "Password Reset Request", htmlContent);
      console.log("Password reset email sent successfully to:", email);
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

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const { resetToken } = req.params;
    console.log("Reset password request received for email:", email);

    if (!email || !resetToken || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findOne({ email });
    if (!user || user.resetPasswordToken !== resetToken || user.resetPasswordTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;
    await user.save();

    console.log("Password reset successfully for email:", email);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
