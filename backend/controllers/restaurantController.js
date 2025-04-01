const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");
const User = require("../models/User"); // Import User model
const slugify = require("slugify");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, restaurantSlug, location, brandColors, languages } = req.body;
    // Extract username from authenticated request for security against params changing
    const { username } = req.user;

    if (!name || !languages || languages.length === 0) {
      return res
        .status(400)
        .json({ message: "Name and at least one language are required." });
    }

    // Ensure user exists (lookup by username as needed)
    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res
        .status(403)
        .json({ message: "Unauthorized: User does not exist." });
    }

    // Generate slug if not provided
    const generatedSlug = slugify(name, { lower: true, strict: true });
    const finalSlug = restaurantSlug ? restaurantSlug : generatedSlug;

    // Check for duplicate restaurant name or slug
    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "Name already taken. Choose a different one." });
    }

    const restaurant = new Restaurant({
      name,
      restaurantSlug: finalSlug,
      brandColors,
      location,
      languages,
      createdBy: username, // Store username as creator
    });

    await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
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

    res.status(200).json({
      message: "Restaurants fetched successfully",
      total: totalRestaurants,
      page: parseInt(page),
      limit: parseInt(limit),
      restaurants,
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

    res
      .status(200)
      .json({ message: "Restaurant fetched successfully", restaurant });
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
    if (
      req.user.role !== "super-admin" &&
      req.user.username !== restaurant.createdBy
    ) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to update this restaurant.",
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
    res
      .status(200)
      .json({ message: "Restaurant updated successfully", restaurant });
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
    if (
      req.user.role !== "super-admin" &&
      req.user.username !== restaurant.createdBy
    ) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to delete this restaurant.",
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
