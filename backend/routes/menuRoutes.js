const express = require("express");
const menuController = require("../controllers/menuController");
const { protectRoute, authorizeRoles } = require('../middlewares/middlewares');

const router = express.Router();

router.post("/:restaurantId", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.createMenu);
router.get("/:restaurantId/get-all-menus", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.getAllMenus);
router.get("/:id", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.getMenuById);
router.put("/:id", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.updateMenu);
router.delete("/:id", protectRoute, authorizeRoles('super-admin', 'admin'), menuController.deleteMenu);

module.exports = router;
