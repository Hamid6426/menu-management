const express = require("express");
const menuController = require("../controllers/menuController");
const { protectRoute, authorizeRoles } = require("../middlewares/middlewares");

const router = express.Router();

// Create a new menu for a restaurant identified by restaurantSlug
router.post("/:restaurantSlug", protectRoute, authorizeRoles("super-admin", "admin"), menuController.createMenu);

// Get all menus for a restaurant using restaurantSlug
router.get("/:restaurantSlug/menus", protectRoute, authorizeRoles("super-admin", "admin"), menuController.getCurrentRestaurantMenus);

// Get a single menu by its slug
router.get("/:menuSlug", protectRoute, authorizeRoles("super-admin", "admin"), menuController.getMenuById);

// Update a menu by its slug
router.put("/:menuSlug", protectRoute, authorizeRoles("super-admin", "admin"), menuController.updateMenu);

// Delete a menu by its slug
router.delete("/:menuSlug", protectRoute, authorizeRoles("super-admin", "admin"), menuController.deleteMenu);

module.exports = router;
