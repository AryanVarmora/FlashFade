require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Add a root route for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FlashFade API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Database connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashfade';
console.log('🔗 Attempting to connect to MongoDB:', mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Check if route files exist and log them
const fs = require('fs');
const routeFiles = ['auth', 'decks', 'cards', 'users'];

routeFiles.forEach(routeFile => {
  const routePath = path.join(__dirname, 'routes', `${routeFile}.js`);
  if (fs.existsSync(routePath)) {
    console.log(`✅ Found route file: ${routeFile}.js`);
    try {
      app.use(`/api/${routeFile}`, require(`./routes/${routeFile}`));
      console.log(`🔗 Mounted route: /api/${routeFile}`);
    } catch (error) {
      console.error(`❌ Error loading ${routeFile} routes:`, error.message);
    }
  } else {
    console.error(`❌ Missing route file: ${routePath}`);
  }
});

// Check if middleware exists
const middlewarePath = path.join(__dirname, 'middleware', 'auth.js');
if (fs.existsSync(middlewarePath)) {
  console.log('✅ Found auth middleware');
} else {
  console.error('❌ Missing auth middleware:', middlewarePath);
}

// Test route to check if everything is working
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API routes are working!',
    routes: {
      auth: '/api/auth',
      decks: '/api/decks',
      cards: '/api/cards',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Error caught by middleware:', err);
  console.error('Stack trace:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404s
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'GET /api/test',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/decks',
      'GET /api/users/profile'
    ]
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log('\n📋 Available endpoints:');
  console.log('   GET  / - Server status');
  console.log('   GET  /api/test - API test');
  console.log('   POST /api/auth/register - Register user');
  console.log('   POST /api/auth/login - Login user');
});