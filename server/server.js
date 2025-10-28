const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// ✅ Allow all origins (temporary or for testing)
const corsOptions = {
  origin: '*',             // Allow all origins
  credentials: true,       // Allow cookies/auth headers (Note: '*' with credentials may cause issues)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Health check route
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/optimize', require('./routes/optimizationRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
