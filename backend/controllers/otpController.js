import PendingUser from '../models/pendingUserModel.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateJWT from '../utils/generateJWT.js';

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
    const { password, ...responseObject } = userData;

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

    return res.status(201).json({
      message: 'User created successfully and logged in',
      body: responseObject,
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default handleOTP;
