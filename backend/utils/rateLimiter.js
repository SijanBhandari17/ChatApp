import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // max 3 requests per 15 mins per IP
  message: { error: 'Too many password reset requests. Try again later.' },
});

export { rateLimiter };
