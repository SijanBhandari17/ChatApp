import crypto from 'crypto';
import bcrypt from 'bcrypt';
import ForgotPassword from '../models/forgotPasswordModel.js';
import User from '../models/userModel.js';
import { sendResetLink } from './mailController.js';

const createAndSendResetLink = async user => {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(token, 10);

  const session = await mongoose.startTransaction();
  session.startTransaction();
  try {
    await ForgotPassword.deleteMany({ userId: user._id });
    await ForgotPassword.create({
      userId: user._id,
      token: hash,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });

    const link = `http://localhost:5173/auth/resetpassword?token=${token}&id=${user._id}`;
    const mailResult = await sendResetLink(user.email, link);

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
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
      const record = await ForgotPassword.findOne({ userId: user._id });
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

export { handlePasswordForgot, handlePasswordForgotResend };
