const mongoose = require('mongoose');
const dotenv = require("dotenv");
const User = require('./models/User');
const Cart = require('./models/Cart');
const Product = require("./models/Product")
const products = require('./data/products');

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Function to seed data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //Create admin user
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'mariorossi@test.com',
      password: '123456',
      role: 'admin',
    });

    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);

    console.log('Product data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
