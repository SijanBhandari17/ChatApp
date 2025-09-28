const rateLimit = require('express-rate-limit');

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // max 3 requests per 15 mins per IP
  message: { error: 'Too many password reset requests. Try again later.' },
});

module.exports = { resetLimiter };
