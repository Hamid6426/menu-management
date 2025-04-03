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

exports.convertToObjectId = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    req.params._id = new mongoose.Types.ObjectId(req.params._id); // Ensure it's an ObjectId
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid ObjectId format" });
  }
};

exports.convertAvailabilityTime = (req, res, next) => {
  if (req.body.availability) {
    let availabilityObj;

    // If availability is a string, try to parse it as JSON
    if (typeof req.body.availability === "string") {
      try {
        availabilityObj = JSON.parse(req.body.availability);
      } catch (error) {
        return res.status(400).json({ message: "Invalid availability format. Ensure it's a valid JSON string." });
      }
    } else {
      availabilityObj = req.body.availability;
    }

    // Check for existence of startTime and endTime
    if (!availabilityObj.startTime || !availabilityObj.endTime) {
      return res.status(400).json({ message: "Availability must include startTime and endTime in HH:mm format." });
    }

    // Ensure startTime and endTime are strings
    if (typeof availabilityObj.startTime !== "string" || typeof availabilityObj.endTime !== "string") {
      return res.status(400).json({ message: "Availability times must be provided in HH:mm format as strings." });
    }

    // Helper function to convert "HH:mm" string to minutes
    const convertTimeStrToMinutes = (timeStr) => {
      const parts = timeStr.split(":");
      if (parts.length !== 2) return NaN;
      const [hours, minutes] = parts.map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = convertTimeStrToMinutes(availabilityObj.startTime);
    const endMinutes = convertTimeStrToMinutes(availabilityObj.endTime);

    // Validate time conversion
    if (
      isNaN(startMinutes) ||
      isNaN(endMinutes) ||
      startMinutes < 0 ||
      endMinutes > 1440 ||
      startMinutes >= endMinutes
    ) {
      return res.status(400).json({
        message: "Invalid availability times. Times must be between 00:00 and 24:00 with start before end.",
      });
    }

    // Replace string times with numeric minute values
    availabilityObj.startTime = startMinutes;
    availabilityObj.endTime = endMinutes;
    req.body.availability = availabilityObj;
  }
  next();
};