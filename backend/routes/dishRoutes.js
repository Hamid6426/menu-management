const express = require("express");
const dishController = require("../controllers/dishController");
const { protectRoute } = require("../middlewares/middlewares");
const multer = require("multer");

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/:menuId/create-dish",
  protectRoute,
  upload.single("image"),
  dishController.createDish
);
router.post(
  "/:menuId/list-menu-dishes",
  protectRoute,
  dishController.listMenuDishes
);
router.get("/:id", protectRoute, dishController.getDishById);
router.put(
  "/:id",
  protectRoute,
  upload.single("image"),
  dishController.updateDish
);
router.delete("/:id", protectRoute, dishController.deleteDish);

module.exports = router;
