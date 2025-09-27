const PendingUser = require('../models/pendingUserModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateJWT = require('../utils/generateJWT');

const handleOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) return res.status(400).json({ error: 'Otp is invalid' });

    if (pendingUser.otp_expiry < Date.now())
      return res.status(400).json({ error: 'Otp is expired' });

    const isValidOtp = await bcrypt.compare(otp, pendingUser.otp);
    if (!isValidOtp) return res.status(400).json({ error: 'Otp is invalid' });

    const { otp: _otp, otp_expiry, _id, ...userData } = pendingUser.toObject();

    const user = await User.create(userData);

    await PendingUser.deleteOne({ _id: pendingUser._id });
    const { accessToken, refreshToken } = generateJWT({
      userName: pendingUser.userName,
      email: pendingUser.email,
      id: pendingUser._id,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refresh_token = refreshToken;
    await user.save();

    return res
      .status(201)
      .json({ message: 'User created successfully and logged in', body: userData, accessToken });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = handleOTP;
