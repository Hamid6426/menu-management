const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const slugify = require("slugify");

exports.createDish = async (req, res) => {
  try {
    // Expect multi-language objects for name and description
    let { name, description, price, kilocalories, category, allergens, availability } = req.body;
    const { restaurantSlug } = req.params;
    const { username } = req.user;

    console.log("Received Name:", name);

    if (typeof name === "string") {
      name = JSON.parse(name); // Parse the stringified JSON object
    }
    if (typeof description === "string") {
      description = JSON.parse(description);
    }
    if (!name.en) {
      return res.status(400).json({ message: "English name is required" });
    }

    // Validate numeric fields
    if (isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({ message: "Price must be a positive number." });
    }
    if (kilocalories && (isNaN(kilocalories) || Number(kilocalories) < 0)) {
      return res.status(400).json({ message: "Kilocalories must be a positive number if provided." });
    }

    // Authorization check
    if (!["super-admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can add dishes.",
      });
    }

    // Verify restaurant exists
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Generate dish slug using the English name
    const generatedDishSlug = slugify(name.en, { lower: true, strict: true });
    const existingDish = await Dish.findOne({
      dishSlug: generatedDishSlug,
      restaurantSlug,
    });
    if (existingDish) {
      return res.status(400).json({
        message: "A dish with this name already exists in this restaurant.",
      });
    }

    // Build dish data using multi-language fields directly, no need to parse
    const dishData = {
      name: {
        en: name.en,
        it: name.it || "",
        ar: name.ar || "",
      },
      description: {
        en: (description && description.en) || "",
        it: (description && description.it) || "",
        ar: (description && description.ar) || "",
      },
      dishSlug: generatedDishSlug,
      price: Number(price),
      kilocalories: kilocalories ? Number(kilocalories) : undefined,
      category, // category remains a single language string per schema
      allergens: allergens || [], // allergens as an array of strings
      availability, // Assume already processed by middleware
      restaurantSlug,
      createdBy: username,
    };

    if (req.file) {
      dishData.dishImage = req.file.buffer;
    }

    // Create and save the dish
    const dish = new Dish(dishData);
    await dish.save();

    // Optionally add dish reference to the restaurant if required
    restaurant.dishes.push(dish.dishSlug);
    await restaurant.save();

    // Remove dish image from response to reduce payload size
    const responseDish = dish.toObject();
    delete responseDish.dishImage;

    res.status(201).json({ message: "Dish created successfully", dish: responseDish });
  } catch (error) {
    console.error("Create Dish Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCurrentRestaurantDishes = async (req, res) => {
  try {
    const { restaurantSlug } = req.params;
    const { lang = "en" } = req.query; // Default to English

    if (!restaurantSlug) {
      return res.status(400).json({ message: "Restaurant slug is required." });
    }

    // Verify that the restaurant exists
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Retrieve dishes for the restaurant
    const dishes = await Dish.find({ restaurantSlug });

    // Format each dish to include the correct language fields with fallback
    const formattedDishes = dishes.map((dish) => {
      const dishObj = dish.toObject();

      // For multi-language fields: name and description
      dishObj.name = dish.name[lang] || dish.name.en;
      dishObj.description = dish.description[lang] || dish.description.en;

      // Category and allergens are not multilingual so they remain unchanged
      // dishObj.category remains a string (e.g., "Starter")
      // dishObj.allergens remains an array of strings

      return dishObj;
    });

    res.status(200).json({ message: "Dishes fetched successfully", dishes: formattedDishes });
  } catch (error) {
    console.error("Get All Dishes Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllDishes = async (_req, res) => {
  
  try {
    const dishes = await Dish.find();
    res.status(200).json({ dishes });
  } catch (error) {
    console.error("Get All Dishes Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getCurrentRestaurantAllergens = async (req, res) => {
//   const { restaurantSlug } = req.params;

//   try {
//     // Find dishes for the restaurant and aggregate distinct allergens
//     const allergens = await Dish.aggregate([
//       { $match: { restaurantSlug } }, // Filter by restaurant
//       { $unwind: "$allergens" }, // Flatten the allergens array
//       { $group: { _id: "$allergens" } }, // Group by allergen
//       { $project: { allergen: "$_id", _id: 0 } }, // Project only the allergen field
//     ]);

//     res.json({ allergens: allergens.map((item) => item.allergen) });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching allergens." });
//   }
// };

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
    const { dishSlug } = req.params; // Get dishSlug from params
    const { name, description, price, kilocalories, category, allergens, availability } = req.body;
    const { username } = req.user;

    // Authorization check: Only Admins or Super Admins can update dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can update dishes.",
      });
    }

    // Fetch the dish by its slug
    let dish = await Dish.findOne({ dishSlug });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    // Prepare update object
    const updates = {};

    // Update name and regenerate the dishSlug
    if (name) {
      updates.name = name;
      const newDishSlug = slugify(name.en, { lower: true, strict: true });
      updates.dishSlug = newDishSlug;

      // Ensure the new dishSlug doesn't conflict with existing dishes
      const existingDish = await Dish.findOne({ dishSlug: newDishSlug, restaurantSlug: dish.restaurantSlug });
      if (existingDish && existingDish._id.toString() !== dish._id.toString()) {
        return res.status(400).json({
          message: "A dish with this name already exists in this restaurant.",
        });
      }
    }

    // Update description, category, allergens, and availability
    if (description) updates.description = description;
    if (category) updates.category = category;
    if (allergens) updates.allergens = allergens;
    if (availability) {
      const { startTime, endTime } = availability;
      if (isNaN(startTime) || isNaN(endTime) || startTime < 0 || endTime > 1440 || startTime >= endTime) {
        return res.status(400).json({
          message: "Invalid availability times. Must be between 0-1440 with start before end.",
        });
      }
      updates.availability = availability;
    }

    // Validate and update price
    if (price !== undefined) {
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Price must be a positive number." });
      }
      updates.price = Number(price);
    }

    // Validate and update kilocalories
    if (kilocalories !== undefined) {
      if (isNaN(kilocalories) || kilocalories < 0) {
        return res.status(400).json({ message: "Kilocalories must be a positive number." });
      }
      updates.kilocalories = Number(kilocalories);
    }

    // Handle new dish image upload if available
    if (req.file) {
      updates.dishImage = req.file.buffer;
    }

    // Perform the update
    const updatedDish = await Dish.findOneAndUpdate({ dishSlug }, updates, {
      new: true,
      runValidators: true, // Ensure that schema validations are run
    });

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found after update attempt." });
    }

    return res.status(200).json({
      message: "Dish updated successfully",
      dish: updatedDish,
    });
  } catch (error) {
    console.error("Update Dish Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



// Delete a dish by its slug
exports.deleteDish = async (req, res) => {
  try {
    const { dishSlug } = req.params; // Extract the dishSlug from params

    // Authorization check: Only Admins or Super Admins can delete dishes
    if (req.user.role !== "super-admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only Admins or Super Admins can delete dishes.",
      });
    }

    // Check if the dish exists
    const dish = await Dish.findOne({ dishSlug });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    // Remove the dish from the database
    await dish.remove();

    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Delete Dish Error:", error); // Log any error that occurs
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

