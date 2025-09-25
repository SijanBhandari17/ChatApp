const crypto = require('crypto');
const bcrypt = require('bcrypt');
const forgotPassword = require('../models/forgotPasswordModel');
const User = require('../models/userModel');
const { sendResetLink } = require('./mailController');

const handlePasswordForgot = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "If the email exists in our system, you'll receive a reset link" });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, 10);

    await forgotPassword.deleteMany({ userId: user._id });

    const result = await forgotPassword.create({
      userId: user._id,
      token: hash,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });

    const link = `http://localhost/reset-password?token=${token}&id=${user._id}`;

    await sendResetLink(user.email, link);

    return res
      .status(200)
      .json({ message: "If the email exists in our system, you'll receive a reset link" });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred ${err}` });
  }
};

module.exports = { handlePasswordForgot };
