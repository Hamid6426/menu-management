const express = require('express');
const { check } = require('express-validator');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

// Register user (Admin & Super Admin only)
router.post(
  '/register',
  authorizeRoles('admin', 'superadmin'),
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
  ],
  authMiddleware,
  authMiddleware.optional, 
  register,
);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authMiddleware, authController.logout);

// Forgot Password
router.post('/forgot-password', [check('email', 'Valid email is required').isEmail()], authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
