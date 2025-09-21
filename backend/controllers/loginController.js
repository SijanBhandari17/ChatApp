const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');

const handleLogin = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Email is not registered' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ error: 'Incorrect Password' });

    const { accessToken, refreshToken } = generateJWT({ email, userName });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refresh_token = refreshToken;
    await user.save();
    const { password: _, refresh_token, ...userData } = user.toObject();
    return res.status(200).json({ message: 'Successful login', body: usrData, accessToken });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err.message}` });
  }
};

module.exports = handleLogin;
