const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route POST /api/users/register
//@desc Register a new user
// @access Public

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create new user (password will be hashed by the pre-save hook in the model)
    user = new User({ name, email, password });
    await user.save();

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Check JWT secret
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    //Sign and return the token
    jwt.sign(payload, jwtSecret, { expiresIn: '40h' }, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Token generation failed' });
      }

      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// @route POST /api/users/login
// @desc Login user
// @access Public

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found, checking password...');
    console.log('Stored password hash:', user.password);
    console.log('Entered password:', password);

    // Check password using the model's matchPassword method
    const isMatch = await user.matchPassword(password);

    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Login successful for user:', email);

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Check JWT secret
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    // Sign and return the token
    jwt.sign(payload, jwtSecret, { expiresIn: '40h' }, (err, token) => {
      if (err) {
        console.error('Token generation error:', err);
        return res.status(500).json({ message: 'Token generation failed' });
      }

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/users/list
// @desc Get all users (for testing)
// @access Public (should be protected in production)
router.get('/list', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
});

// @route POST /api/users/reset-password
// @desc Reset password for testing (temporary route)
// @access Public
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    console.log('Password reset attempt for email:', email);

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    console.log('Password reset successful for:', email);
    console.log('New password hash:', user.password);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
