const express = require('express');
const { check } = require('express-validator');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

// Get all users (Super Admin only)
router.get('/', authMiddleware, authorizeRoles('superadmin'), userController.getAllUsers);

// Get user by ID (Super Admin, Admin - own users)
router.get('/:id', authMiddleware, authorizeRoles('superadmin', 'admin'), userController.getUserById);

// Invite a Manager (Admin only)
router.post(
  '/invite',
  authMiddleware,
  authorizeRoles('admin'),
  [check('email', 'Valid email is required').isEmail()],
  userController.inviteManager
);

// Update user (Super Admin, Admin - own users)
router.put('/:id', authMiddleware, authorizeRoles('superadmin', 'admin'), userController.updateUser);

// Delete user (Super Admin only)
router.delete('/:id', authMiddleware, authorizeRoles('superadmin'), userController.deleteUser);

module.exports = router;
