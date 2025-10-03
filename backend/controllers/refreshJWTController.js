import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import generateJWT from '../utils/generateJWT.js';

const handleJWTRefresh = async (req, res) => {
  if (req.cookies?.refreshToken) {
    const refreshToken = req.cookies.refreshToken;
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      console.log(decoded);
      const user = await User.findOne({ email: decoded.email });

      if (!user.refresh_token === refreshToken)
        return res.status(403).json({ error: 'Invalid refresh token ' });

      const { accessToken, refreshToken: _refreshToken } = generateJWT({
        email: decoded.email,
        userName: decoded.userName,
        id: decoded.userId,
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
    return res.status(401).json({ error: 'Refresh token expired or invalid' });
  }
};

export default handleJWTRefresh;
