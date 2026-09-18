const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      process.exit(1);
    }

    console.log('User found:', email);
    console.log('Old password hash:', user.password);

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    console.log('Password updated successfully!');
    console.log('New password hash:', user.password);
    console.log(`\nYou can now login with:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${newPassword}`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Get email and password from command line arguments
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('Usage: node resetUserPassword.js <email> <newPassword>');
  console.log('Example: node resetUserPassword.js user@example.com newpass123');
  process.exit(1);
}

resetPassword(email, newPassword);
