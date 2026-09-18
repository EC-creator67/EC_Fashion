const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/admin/users
// Get all users..(Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/admin/users
// Add a new user - admin only
router.post('/', protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: ' User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'customer',
    });

    await user.save();
    res.status(201).json({ message: 'User Created Successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/admin/users/:id
// Update admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;    
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();
    res.json({ message: 'User Updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/admin/users/:id
// Delete an User
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User Deleted' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
