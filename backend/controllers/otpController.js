const PendingUser = require('../models/pendingUserModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
    const newUser = await User.create(userData);
    await PendingUser.deleteOne({ _id: pendingUser._id });

    res.status(201).json({ message: 'User created successfully', body: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = handleOTP;
