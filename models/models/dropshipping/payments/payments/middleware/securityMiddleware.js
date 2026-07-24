const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { status: 429, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const sanitizeInput = (req, res, next) => {
  // Defensive recursive sanitization against NoSQL Injections ($ operators)
  const clean = (obj) => {
    for (let key in obj) {
      if (key.startsWith('$')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        clean(obj[key]);
      }
    }
  };
  if (req.body) clean(req.body);
  if (req.query) clean(req.query);
  if (req.params) clean(req.params);
  next();
};

module.exports = { apiLimiter, helmetHeaders: helmet(), sanitizeInput };
