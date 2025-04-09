// middlewares/middlewares.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes - ensure user is logged in
exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      $or: [{ _id: decoded.userId }, { username: decoded.username }],
    }).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request and this was which cause req.user = { username } to be not found

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Authorize roles - restrict access to specific roles
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

