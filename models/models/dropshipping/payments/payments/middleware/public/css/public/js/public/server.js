const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { apiLimiter, helmetHeaders, sanitizeInput } = require('./middleware/securityMiddleware');

dotenv.config();

const app = express();

// Global Security Middleware
app.use(helmetHeaders);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(sanitizeInput);

// Apply Rate Limiter to API routes
app.use('/api', apiLimiter);

// Serve Static Frontend Assets
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ONLINE', brand: 'LunevaBeauty', version: 'v30.0' });
});

// Fallback to Index Engine for Client Router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[LunevaBeauty Server] Running in production on port ${PORT}`);
});
