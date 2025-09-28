const crypto = require('crypto');
const bcrypt = require('bcrypt');
const forgotPassword = require('../models/forgotPasswordModel');
const User = require('../models/userModel');
const { sendResetLink } = require('./mailController');

const createAndSendResetLink = async user => {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(token, 10);

  await forgotPassword.deleteMany({ userId: user._id });

  await forgotPassword.create({
    userId: user._id,
    token: hash,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });

  const link = `http://localhost:5173/auth/resetpassword?token=${token}&id=${user._id}`;
  console.log(link);

  const mailResult = await sendResetLink(user.email, link);
  console.log(mailResult);
};

const handlePasswordForgot = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      await createAndSendResetLink(user);
    }
    return res
      .status(200)
      .json({ message: "If the email exists in our system, you'll receive a reset link" });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
};

const handlePasswordForgotResend = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const record = await forgotPassword.findOne({ userId: user._id });
      if (!record || record.expiresAt <= Date.now()) {
        await createAndSendResetLink(user);
      } else {
        await createAndSendResetLink(user);
      }
    }
    return res
      .status(200)
      .json({ message: "If the email exists in our system, you'll receive a reset link" });
  } catch (err) {
    return res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
};

module.exports = { handlePasswordForgot, handlePasswordForgotResend };
