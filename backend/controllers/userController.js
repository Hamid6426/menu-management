const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // You may want to limit updates to certain fields for security reasons
    const updates = req.body;
    const allowedUpdates = ["name", "email"];
    const actualUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        actualUpdates[key] = updates[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, actualUpdates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAllergies = async (req, res) => {
  try {
    // Expect an array of allergies in req.body.allergies
    const { allergies } = req.body;
    if (!Array.isArray(allergies)) {
      return res.status(400).json({ message: "Allergies must be an array" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { allergies },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update Allergies Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(username).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update user role (Super Admin / Admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { username } = req.params;
    const { role } = req.body;

    if (!["super-admin", "admin", "manager", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(username, { role }, { new: true, runValidators: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update User Role Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user (Super Admin / Admin)
exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await User.findByIdAndDelete(username);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// List the managers associated with the current user and their restaurants
exports.listSpecificRestaurantManagers = async (req, res) => {
  try {
    // Find restaurants created by the current user
    const restaurants = await Restaurant.find({ createdBy: req.user._id });

    // Assuming each restaurant has a "managers" field (array of User IDs)
    const managerIds = restaurants.reduce((acc, restaurant) => {
      if (restaurant.managers && restaurant.managers.length > 0) {
        acc.push(...restaurant.managers);
      }
      return acc;
    }, []);

    // Remove duplicate manager IDs
    const uniqueManagerIds = [...new Set(managerIds.map((id) => id.toString()))];

    // Fetch the manager user documents
    const managers = await User.find({ _id: { $in: uniqueManagerIds } });

    res.status(200).json({
      message: "Managers fetched successfully",
      managers,
    });
  } catch (error) {
    console.error("List Managers Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.listAllAdminAssociatedManagers = async (req, res) => {
  try {
    // Find restaurants created by the current user
    const restaurants = await Restaurant.find({ createdBy: req.user._id });

    // Assuming each restaurant has a "managers" field (array of User IDs)
    const managerIds = restaurants.reduce((acc, restaurant) => {
      if (restaurant.managers && restaurant.managers.length > 0) {
        acc.push(...restaurant.managers);
      }
      return acc;
    }, []);

    // Remove duplicate manager IDs
    const uniqueManagerIds = [...new Set(managerIds.map((id) => id.toString()))];

    // Fetch the manager user documents
    const managers = await User.find({ _id: { $in: uniqueManagerIds } });

    res.status(200).json({
      message: "Managers fetched successfully",
      managers,
    });
  } catch (error) {
    console.error("List Managers Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};