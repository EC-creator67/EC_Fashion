const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Load environment variables
require('dotenv').config();

// Validate Cloudinary environment variables
const requiredEnvVars = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

console.log('Cloudinary Environment Variables:');
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? 'SET' : 'MISSING'}`);
  if (value) {
    console.log(`${key} length: ${value.length}`);
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Test Cloudinary configuration
console.log('Testing Cloudinary configuration...');
console.log('Config object:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key,
  api_secret: cloudinary.config().api_secret ? 'SET' : 'MISSING',
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Alternative upload method using direct buffer upload
router.post('/simple', upload.single('image'), async (req, res) => {
  try {
    console.log('=== SIMPLE UPLOAD TEST ===');

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Attempting direct buffer upload...');

    // Convert buffer to base64
    const base64String = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64String}`;

    // Upload using data URI
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'ec_fashion_products',
      resource_type: 'auto',
    });

    console.log('Direct upload successful:', result.secure_url);

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Simple upload error:', error);
    res.status(500).json({
      message: 'Simple upload failed',
      error: error.message,
      details: error.http_code ? `HTTP ${error.http_code}` : 'Unknown error',
    });
  }
});
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    console.log('=== UPLOAD REQUEST RECEIVED ===');
    console.log('User:', req.user ? req.user._id : 'No user');
    console.log('File:', req.file ? req.file.originalname : 'No file');

    if (!req.file) {
      console.log('ERROR: No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    console.log('Cloudinary config check:', {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    });

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'ec_fashion_products',
            transformation: [
              { width: 800, height: 800, crop: 'limit' },
              { quality: 'auto' },
            ],
          },
          (error, result) => {
            if (result) {
              console.log('Cloudinary upload successful');
              resolve(result);
            } else {
              console.log('Cloudinary upload failed:', error);
              reject(error);
            }
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    console.log('Starting Cloudinary upload...');
    const result = await streamUpload(req.file.buffer);

    console.log('Upload successful:', result.secure_url);

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);

    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({ message: error.message });
    }

    if (error.http_code === 401) {
      return res
        .status(401)
        .json({ message: 'Invalid Cloudinary credentials' });
    }

    res.status(500).json({
      message: 'Server Error during image upload',
      error: error.message,
    });
  }
});

// Debug route to check Cloudinary configuration
router.get('/test-config', async (req, res) => {
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
    };

    // Test API call to validate credentials
    const pingResult = await cloudinary.api.ping();

    res.json({
      message: 'Cloudinary configuration status',
      config,
      connectionTest: 'SUCCESS',
      pingResult: pingResult,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Cloudinary configuration test failed',
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
        api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
      },
      connectionTest: 'FAILED',
      error: error.message,
    });
  }
});

module.exports = router;
