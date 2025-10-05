import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 15,
  message: { error: 'Too many requests. Try again later.' },
});

export { rateLimiter };
