const express = require("express");
const menuController = require("../controllers/menuController");
const { protectRoute, authorizeRoles } = require('../middlewares/middlewares');

const router = express.Router();

router.post("/:restaurantId", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.createMenu);
router.get("/:restaurantId/restaurant-menus", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.getCurrentRestaurantMenus);
router.get("/:menuId", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.getMenuById);
router.put("/:menuId", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.updateMenu);
router.delete("/:menuId", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.deleteMenu);

module.exports = router;
