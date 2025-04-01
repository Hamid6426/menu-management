const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const { protectRoute, authorizeRoles } = require("../middlewares/middlewares");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Create a new restaurant (no username in URL)
router.post("/:username", protectRoute, authorizeRoles("super-admin", "admin"), restaurantController.createRestaurant);

// Get all restaurants
router.get("/", restaurantController.getAllRestaurants);

// Get restaurants created by a specific user (avoid conflict with restaurant slug)
router.get("/user/:username", protectRoute, authorizeRoles("admin", "super-admin"), restaurantController.getCurrentUserRestaurants);

// Get a single restaurant by its slug
router.get("/:restaurantSlug", restaurantController.getRestaurantBySlug);

// Update a restaurant by its slug
router.put("/:restaurantSlug", protectRoute, authorizeRoles("admin", "manager", "super-admin"), restaurantController.updateRestaurant);

// Delete a restaurant by its slug
router.delete("/:restaurantSlug", protectRoute, authorizeRoles("admin", "super-admin"), restaurantController.deleteRestaurant);

// Upload restaurant logo
router.post(
  "/:restaurantSlug/add-logo",
  protectRoute,
  upload.single("logo"),
  authorizeRoles("admin", "manager", "super-admin"),
  restaurantController.uploadRestaurantLogo
);

module.exports = router;
