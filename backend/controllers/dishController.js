const Dish = require("../models/Dish");
const Menu = require("../models/Menu");

exports.createDish = async (req, res) => {
  try {
    // Note: Removed category from destructuring since it's not needed now
    const { name, description, price, allergens, availability, menuId } = req.body;

    if (!name || !price || !menuId) {
      return res
        .status(400)
        .json({ message: "Name, price, and menu ID are required." });
    }

    // Check if the menu exists
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    // Only Admins or Super Admins can create dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only Admins or Super Admins can add dishes." });
    }

    // Build dish data; add image if provided by multer
    const dishData = {
      name,
      description,
      price,
      allergens,
      availability,
      menuId,
    };

    if (req.file) {
      dishData.image = req.file.buffer;
    }

    // Create the dish
    const dish = new Dish(dishData);

    await dish.save();

    // Add dish to the menu
    menu.dishes.push(dish._id);
    await menu.save();

    res.status(201).json({ message: "Dish created successfully", dish });
  } catch (error) {
    console.error("Create Dish Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.listMenuDishes = async (req, res) => {
  try {
    const { menuId } = req.params;

    // Verify that the menu exists
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    // Find dishes associated with the menuId
    const dishes = await Dish.find({ menuId });
    return res
      .status(200)
      .json({ message: "Dishes fetched successfully", dishes });
  } catch (error) {
    console.error("List Menu Dishes Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single dish by its ID
exports.getDishById = async (req, res) => {
  try {
    const dishId = req.params.id;
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }
    return res
      .status(200)
      .json({ message: "Dish fetched successfully", dish });
  } catch (error) {
    console.error("Get Dish By ID Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a dish by its ID
exports.updateDish = async (req, res) => {
  try {
    const dishId = req.params.id;
    const updates = req.body;

    // Only Admins or Super Admins can update dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Forbidden: Only Admins or Super Admins can update dishes.",
        });
    }

    // If an image file is provided in the update, add its buffer to updates
    if (req.file) {
      updates.image = req.file.buffer;
    }

    // Find and update the dish document
    const updatedDish = await Dish.findByIdAndUpdate(dishId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    return res
      .status(200)
      .json({ message: "Dish updated successfully", dish: updatedDish });
  } catch (error) {
    console.error("Update Dish Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a dish by its ID
exports.deleteDish = async (req, res) => {
  try {
    const dishId = req.params.id;

    // Only Admins or Super Admins can delete dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Forbidden: Only Admins or Super Admins can delete dishes.",
        });
    }

    // Find the dish to delete
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    // Remove the dish document from the database
    await dish.remove();

    // Remove dish reference from the associated menu's dishes array
    await Menu.findByIdAndUpdate(dish.menuId, {
      $pull: { dishes: dishId },
    });

    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Delete Dish Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
