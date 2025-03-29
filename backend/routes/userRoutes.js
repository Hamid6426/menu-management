const express = require('express');
const { protectRoute, authorizeRoles } = require('../middlewares/middlewares');
const userController = require("../controllers/userController")

const router = express.Router();

router.get("/profile", protectRoute, userController.getProfile);
router.put("/profile/update", protectRoute, userController.updateProfile);
router.put("/profile/allergies", protectRoute, userController.updateAllergies);

router.get("/", protectRoute, authorizeRoles("admin", "manager", "super-admin"), userController.getAllUsers);
router.get("/:userId", protectRoute, authorizeRoles("admin", "manager", "super-admin"), userController.getUserById);
router.put("/:userId/role", protectRoute, authorizeRoles("admin", "super-admin"), userController.updateUserRole);
router.delete("/:userId", protectRoute, authorizeRoles("admin", "super-admin"), userController.deleteUser);

router.get("/managers", protectRoute, userController.listManagers);

module.exports = router;
