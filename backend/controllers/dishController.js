const Dish = require("../models/Dish");
const Menu = require("../models/Menu");
const slugify = require("slugify");

// Create a new dish
exports.createDish = async (req, res) => {
  try {
    // Expecting menuSlug in the request body instead of menuId
    const { name, description, price, allergens, availability } = req.body;
    const { menuSlug } = req.params;

    if (!name || !price || !menuSlug) {
      return res.status(400).json({ message: "Name, price, and menu slug are required." });
    }

    // Check if the menu exists by slug
    const menu = await Menu.findOne({ menuSlug });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    // Only Admins or Super Admins can create dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can add dishes.",
      });
    }

    // Generate dishSlug from name using slugify
    const generatedDishSlug = slugify(name, { lower: true, strict: true });

    // Build dish data; add image if provided by multer
    const dishData = {
      name,
      dishSlug: generatedDishSlug,
      description,
      price,
      allergens,
      availability,
      menuSlug, // Use menuSlug instead of menuId
    };

    if (req.file) {
      dishData.image = req.file.buffer;
    }

    // Create the dish
    const dish = new Dish(dishData);
    await dish.save();

    // Add dish reference to the menu (using dishSlug)
    menu.dishes.push(dish.dishSlug);
    await menu.save();

    res.status(201).json({ message: "Dish created successfully", dish });
  } catch (error) {
    console.error("Create Dish Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// List all dishes for a given menu (using menuSlug)
exports.listMenuDishes = async (req, res) => {
  try {
    const { menuSlug } = req.params;

    // Verify that the menu exists by slug
    const menu = await Menu.findOne({ menuSlug });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    // Find dishes associated with the menuSlug
    const dishes = await Dish.find({ menuSlug });
    return res.status(200).json({ message: "Dishes fetched successfully", dishes });
  } catch (error) {
    console.error("List Menu Dishes Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single dish by its slug (instead of its ID)
exports.getDishBySlug = async (req, res) => {
  try {
    const { dishSlug } = req.params;
    const dish = await Dish.findOne({ dishSlug });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }
    return res.status(200).json({ message: "Dish fetched successfully", dish });
  } catch (error) {
    console.error("Get Dish By Slug Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a dish by its slug
exports.updateDish = async (req, res) => {
  try {
    const { dishSlug } = req.params;
    const updates = req.body;

    // Only Admins or Super Admins can update dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can update dishes.",
      });
    }

    // If a new name is provided, update the dishSlug accordingly
    if (updates.name) {
      updates.dishSlug = slugify(updates.name, { lower: true, strict: true });
    }

    // If an image file is provided in the update, add its buffer to updates
    if (req.file) {
      updates.image = req.file.buffer;
    }

    // Find and update the dish document by dishSlug
    const updatedDish = await Dish.findOneAndUpdate({ dishSlug }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    return res.status(200).json({ message: "Dish updated successfully", dish: updatedDish });
  } catch (error) {
    console.error("Update Dish Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a dish by its slug
exports.deleteDish = async (req, res) => {
  try {
    const { dishSlug } = req.params;

    // Only Admins or Super Admins can delete dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can delete dishes.",
      });
    }

    // Find the dish to delete by its slug
    const dish = await Dish.findOne({ dishSlug });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    // Remove the dish document from the database
    await dish.remove();

    // Remove dish reference from the associated menu's dishes array (using menuSlug)
    await Menu.findOneAndUpdate({ menuSlug: dish.menuSlug }, { $pull: { dishes: dishSlug } });

    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Delete Dish Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
