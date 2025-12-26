const express = require('express');
const { getUsers, updateUserRole } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getUsers);

router.route('/:id/role')
    .put(updateUserRole);

module.exports = router;
