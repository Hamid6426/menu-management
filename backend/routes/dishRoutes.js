const express = require("express");
const dishController = require("../controllers/dishController");
const { protectRoute } = require("../middlewares/middlewares");
const multer = require("multer");

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Create a new dish for a menu identified by menuSlug
router.post(
  "/:menuSlug/create-dish",
  protectRoute,
  upload.single("image"),
  dishController.createDish
);

// List all dishes for a given menu by its slug
router.post(
  "/:menuSlug/list-menu-dishes",
  protectRoute,
  dishController.listMenuDishes
);

// Get a single dish by its slug
router.get("/:dishSlug", protectRoute, dishController.getDishBySlug);

// Update a dish by its slug
router.put(
  "/:dishSlug",
  protectRoute,
  upload.single("image"),
  dishController.updateDish
);

// Delete a dish by its slug
router.delete("/:dishSlug", protectRoute, dishController.deleteDish);

module.exports = router;
