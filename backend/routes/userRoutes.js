const express = require('express');
const { protectRoute, authorizeRoles } = require('../middlewares/middlewares');
const userController = require("../controllers/userController")

const router = express.Router();

router.get("/", protectRoute, authorizeRoles("super-admin"), userController.getAllUsers);

router.get("/profile", protectRoute, userController.getProfile);
router.put("/profile/update", protectRoute, userController.updateProfile);
router.put("/profile/allergies", protectRoute, userController.updateAllergies);

router.get("/:userId", protectRoute, authorizeRoles("admin", "manager", "super-admin"), userController.getUserById);
router.get("/:username", protectRoute, authorizeRoles("admin", "manager", "super-admin"), userController.getUserByUsername);
router.put("/:username/change-role", protectRoute, authorizeRoles("admin", "super-admin"), userController.updateUserRole);
router.delete("/:username", protectRoute, authorizeRoles("admin", "super-admin"), userController.deleteUser);
router.get("/:username/managers", protectRoute, userController.listAllAdminAssociatedManagers);
router.get("/:restaurantSlug/managers", protectRoute, userController.listSpecificRestaurantManagers);

module.exports = router;