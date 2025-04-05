const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.userRegister);
router.post("/admin-register", authController.adminRegister);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

module.exports = router;
