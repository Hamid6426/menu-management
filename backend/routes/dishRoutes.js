const express = require("express");
const dishController = require("../controllers/dishController");
const {
  protectRoute,
  authorizeRoles,
  convertAvailabilityTime,
  convertToObjectId,
} = require("../middlewares/middlewares");
const { upload, processImage } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Create a new dish for a menu identified by menuSlug
router.post(
  "/:restaurantSlug",
  protectRoute,
  authorizeRoles("super-admin", "admin"),
  convertAvailabilityTime,
  upload.single("image"), // Loads the image into memory
  processImage, // Processes the image (resize/convert to webp)
  dishController.createDish
);

// List all dishes for a given menu by its slug
router.get("/:restaurantSlug", dishController.getCurrentRestaurantDishes);
router.get("/:restaurantSlug/allergens", dishController.getCurrentRestaurantAllergens);

router.get("/:dishSlug/image", dishController.getDishImage);

// Get a single dish by its slug
router.get("/:dishSlug", protectRoute, dishController.getDishBySlug);

// Update a dish by its slug
router.put("/:dishSlug", protectRoute, upload.single("image"), dishController.updateDish);

// Delete a dish by its slug
router.delete("/:dishSlug", protectRoute, dishController.deleteDish);

module.exports = router;
