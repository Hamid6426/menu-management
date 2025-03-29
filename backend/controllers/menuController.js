const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");

exports.createMenu = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const { restaurantId } = req.params;

    // Ensure name, restaurantId, and category are provided
    if (!name || !restaurantId || !category) {
      return res
        .status(400)
        .json({ message: "Name, category and restaurant ID are required." });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Only Admins or Super Admins can create menus
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can create menus.",
      });
    }

    // Create the menu with the category and createdBy field
    const menu = new Menu({
      name,
      description,
      category, // New field added
      restaurant: restaurantId,
      createdBy: req.user._id,
    });

    await menu.save();

    // Update restaurant's menu list
    restaurant.menus.push(menu._id);
    await restaurant.save();

    res.status(201).json({ message: "Menu created successfully", menu });
  } catch (error) {
    console.error("Create Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllMenus = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res
        .status(400)
        .json({ message: "Restaurant ID is required." });
    }

    // Verify that the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Find menus associated with the restaurant
    const menus = await Menu.find({ restaurant: restaurantId });
    res
      .status(200)
      .json({ message: "Menus fetched successfully", menus });
  } catch (error) {
    console.error("Get All Menus Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findById(menuId).populate("dishes");

    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res
      .status(200)
      .json({ message: "Menu fetched successfully", menu });
  } catch (error) {
    console.error("Get Menu By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const updates = req.body; // This may include name, description, category, etc.

    // Find the menu and update it; returns the new document after update
    const menu = await Menu.findByIdAndUpdate(menuId, updates, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res
      .status(200)
      .json({ message: "Menu updated successfully", menu });
  } catch (error) {
    console.error("Update Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;

    // Find the menu first
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    // Remove the menu document
    await menu.remove();

    // Remove the menu reference from the associated restaurant's menus array, if applicable
    await Restaurant.findByIdAndUpdate(menu.restaurant, {
      $pull: { menus: menuId },
    });

    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Delete Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
