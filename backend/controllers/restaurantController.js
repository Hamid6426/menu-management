const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const slugify = require("slugify");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, brandColors, languages } = req.body;
    const { username } = req.user;

    // Ensure 'name' contains at least the English name
    if (!name || typeof name !== "object" || !name.en) {
      return res.status(400).json({ message: "Name must be an object with at least an English name (en)." });
    }

    // Ensure languages is an array and contains valid values
    let parsedLanguages;
    try {
      parsedLanguages = typeof languages === "string" ? JSON.parse(languages) : languages;
      if (!Array.isArray(parsedLanguages) || parsedLanguages.length === 0) {
        throw new Error("Languages must be a non-empty array.");
      }
      const allowedLanguages = ["en", "it", "ar"];
      if (!parsedLanguages.every((lang) => allowedLanguages.includes(lang))) {
        return res.status(400).json({ message: "Invalid language selection." });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid languages format." });
    }

    // Ensure user exists (lookup by username as needed)
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(403).json({ message: "Unauthorized: User does not exist." });
    }

    // Check for duplicate restaurant name or slug
    const existingRestaurant = await Restaurant.findOne({ "name.en": name.en }); // Check by English name
    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant with this name already exists." });
    }

    // Generate restaurant slug
    const generatedSlug = slugify(name.en, { lower: true, strict: true });

    // Check for duplicate slug
    const existingSlug = await Restaurant.findOne({ restaurantSlug: generatedSlug });
    if (existingSlug) {
      return res.status(409).json({ message: "Slug already taken, please choose a different name." });
    }

    // Ensure brandColors is a valid object (parse if it's a string)
    let parsedBrandColors;
    try {
      parsedBrandColors = typeof brandColors === "string" ? JSON.parse(brandColors) : brandColors;
      if (typeof parsedBrandColors !== "object") {
        return res.status(400).json({ message: "Brand colors must be an object." });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid brandColors format." });
    }

    // Create a new restaurant document
    const restaurant = new Restaurant({
      name,
      location,
      restaurantSlug: generatedSlug,
      brandColors: parsedBrandColors,
      languages: parsedLanguages,
      createdBy: username, // Store username as creator
    });

    // Check if the logo file exists and attach it
    if (req.file) {
      restaurant.restaurantLogo = req.file.buffer;
    }

    // Remove restaurant logo from response to reduce payload size
    const responseRestaurant = restaurant.toObject();
    delete responseRestaurant.restaurantLogo;

    // Save restaurant to the database
    await restaurant.save();
    res.status(201).json({ message: "Restaurant created successfully", restaurant: responseRestaurant });
  } catch (error) {
    console.error("Create Restaurant Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all restaurants with pagination
exports.getAllRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const restaurants = await Restaurant.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalRestaurants = await Restaurant.countDocuments();

    // Format the response to return the correct language
    const formattedRestaurants = restaurants.map((restaurant) => ({
      ...restaurant.toObject(),
      name: restaurant.name[lang] || restaurant.name.en, // Fallback to English if missing
      location: restaurant.location[lang] || restaurant.location.en, // Fallback to English if missing
    }));

    res.status(200).json({
      message: "Restaurants fetched successfully",
      total: totalRestaurants,
      page: parseInt(page),
      limit: parseInt(limit),
      restaurants: formattedRestaurants,
    });
  } catch (error) {
    console.error("Get Restaurants Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single restaurant by slug
exports.getRestaurantBySlug = async (req, res) => {
  try {
    const { restaurantSlug } = req.params;

    // Use findOne with restaurantSlug
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant fetched successfully", restaurant });
  } catch (error) {
    console.error("Get Restaurant By Slug Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a restaurant by slug
exports.updateRestaurant = async (req, res) => {
  try {
    const { restaurantSlug } = req.params;
    const { name, location, logo, brandColors, languages } = req.body;

    // Find the restaurant by slug
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Only Super Admin or the creator can update (compare usernames)
    if (req.user.role !== "super-admin" && req.user.username !== restaurant.createdBy) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update this restaurant.",
      });
    }

    // Update fields as needed
    if (name) restaurant.name = name;
    if (location) restaurant.location = location;
    if (logo) restaurant.logo = logo;
    if (brandColors) restaurant.brandColors = brandColors;
    if (languages && languages.length > 0) restaurant.languages = languages;

    // Optionally, if name changes, update restaurantSlug too
    if (name) {
      const newSlug = slugify(name, { lower: true, strict: true });
      restaurant.restaurantSlug = newSlug;
    }

    await restaurant.save();
    res.status(200).json({ message: "Restaurant updated successfully", restaurant });
  } catch (error) {
    console.error("Update Restaurant Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a restaurant by slug
exports.deleteRestaurant = async (req, res) => {
  try {
    const { restaurantSlug } = req.params;

    // Find the restaurant by slug
    const restaurant = await Restaurant.findOne({ restaurantSlug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Only Super Admin or the creator can delete
    if (req.user.role !== "super-admin" && req.user.username !== restaurant.createdBy) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to delete this restaurant.",
      });
    }

    // Delete associated menus by matching restaurantSlug in menus
    await Menu.deleteMany({ restaurantSlug: restaurant.restaurantSlug });

    // Delete the restaurant
    await Restaurant.findOneAndDelete({ restaurantSlug });

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Delete Restaurant Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get restaurants created by the current user (by username)
exports.getCurrentUserRestaurants = async (req, res) => {
  try {
    const { username } = req.params; // username passed in the URL

    const restaurants = await Restaurant.find({ createdBy: username }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    console.error("Get Current User Restaurants Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Upload restaurant logo using Multer and Sharp
exports.uploadRestaurantLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const sharp = require("sharp");
    const fs = require("fs");
    const path = require("path");

    // Input file saved by multer
    const inputPath = req.file.path;
    const outputDir = path.join(__dirname, "../uploads");
    const outputPath = path.join(outputDir, "optimized_" + req.file.filename);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Resize and optimize the image
    await sharp(inputPath).resize({ width: 300 }).toFile(outputPath);

    // Optionally delete the original file
    fs.unlinkSync(inputPath);

    res.status(200).json({
      message: "Logo uploaded successfully",
      logoPath: outputPath,
    });
  } catch (error) {
    console.error("Upload Restaurant Logo Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
