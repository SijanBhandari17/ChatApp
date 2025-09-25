const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

const handleJWTRefresh = async (req, res) => {
  if (req.cookies?.refreshToken) {
    const refreshToken = req.cookies.refreshToken;
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findOne({ email: decoded.email });

      if (!user.refresh_token === refreshToken)
        return res.status(403).json({ error: 'Invalid refresh token ' });

      const { accessToken, refreshToken: _refreshToken } = generateJWT({
        email: decoded.email,
        userName: decoded.email,
      });

      res.cookie('refreshToken', _refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      user.refresh_token = _refreshToken;
      await user.save();
      return res.status(200).json({ message: 'Successful accessToken renewal', accessToken });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Refresh Token Expired. Please log in again' });
      }
      return res.status(500).json({ error: `An error encountered ${err.message}` });
    }
  } else {
    console.log('error');
  }
};
module.exports = handleJWTRefresh;
