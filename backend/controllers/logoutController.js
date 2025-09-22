const User = require('../models/userModel');

const handleLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const user = await User.findOne({ refresh_token: refreshToken });
    user.refresh_token = null;
    user.save();

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: true,
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err}` });
  }
};

module.exports = handleLogout;
