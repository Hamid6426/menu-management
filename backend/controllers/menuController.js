const Menu = require("../models/Menu");
const Dish = require("../models/Dish");
const Restaurant = require("../models/Restaurant");
const slugify = require("slugify");

// Create a new menu
exports.createMenu = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const { restaurantSlug } = req.params;

    // Ensure name, restaurantSlug, and category are provided
    if (!name || !restaurantSlug || !category) {
      return res.status(400).json({ message: "Name, category and restaurant slug are required." });
    }

    // Check if restaurant exists using slug
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Only Admins or Super Admins can create menus
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can create menus.",
      });
    }

    // Generate menuSlug from name if needed
    const generatedMenuSlug = slugify(name, { lower: true, strict: true });

    // Create the menu with restaurantSlug and createdBy as username
    const menu = new Menu({
      name,
      description,
      category,
      menuSlug: generatedMenuSlug,
      restaurantSlug: restaurant.restaurantSlug, // Reference by restaurant slug
      createdBy: req.user.username, // Use username instead of userId
    });

    await menu.save();

    // Update restaurant's menus list (store menuSlug)
    restaurant.menus.push(menu.menuSlug);
    await restaurant.save();

    res.status(201).json({ message: "Menu created successfully", menu });
  } catch (error) {
    console.error("Create Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all menus for a current restaurant by restaurantSlug
exports.getCurrentRestaurantMenus = async (req, res) => {
  try {
    const { restaurantSlug } = req.params;

    if (!restaurantSlug) {
      return res.status(400).json({ message: "Restaurant slug is required." });
    }

    // Verify that the restaurant exists by slug
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Find menus associated with the restaurant using restaurantSlug
    const menus = await Menu.find({ restaurantSlug });
    res.status(200).json({ message: "Menus fetched successfully", menus });
  } catch (error) {
    console.error("Get All Menus Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single menu by its slug
exports.getMenuById = async (req, res) => {
  try {
    const { menuSlug } = req.params;
    const menu = await Menu.findOne({ menuSlug }).populate("dishes");

    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json({ message: "Menu fetched successfully", menu });
  } catch (error) {
    console.error("Get Menu By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a menu by its slug
exports.updateMenu = async (req, res) => {
  try {
    const { menuSlug } = req.params;
    const updates = req.body; // This may include name, description, category, etc.

    // If name is being updated, generate a new slug and update it accordingly.
    if (updates.name) {
      updates.menuSlug = slugify(updates.name, { lower: true, strict: true });
    }

    // Find the menu by slug and update it; returns the new document after update
    const menu = await Menu.findOneAndUpdate({ menuSlug }, updates, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json({ message: "Menu updated successfully", menu });
  } catch (error) {
    console.error("Update Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a menu by its slug
exports.deleteMenu = async (req, res) => {
  try {
    const { menuSlug } = req.params;
    // Find the menu first using its slug
    const menu = await Menu.findOne({ menuSlug });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }
    // Delete associated dishes (assumes dishes array contains dish slugs)
    await Dish.deleteMany({ dishSlug: { $in: menu.dishes } });
    // Remove the menu document
    await menu.deleteOne();

    // Remove the menu reference from the associated restaurant's menus array
    await Restaurant.findOneAndUpdate(
      { restaurantSlug: menu.restaurantSlug },
      { $pull: { menus: menuSlug } }
    );
    res.status(200).json({ message: "Menu and its dishes deleted successfully" });
  } catch (error) {
    console.error("Delete Menu Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
