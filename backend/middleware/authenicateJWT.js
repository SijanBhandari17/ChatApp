const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { email: decoded.email, userName: decoded.userName };
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Access Token Expired' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }
};
module.exports = authenticateRequest;
