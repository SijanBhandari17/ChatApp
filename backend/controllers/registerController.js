import PendingUser from '../models/pendingUserModel.js';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import { sendOTP } from './mailController.js';
import { validationResult, matchedData } from 'express-validator';
import User from '../models/userModel.js';

const handleRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const cleanData = matchedData(req);

  const { userName, email, password } = cleanData;

  const alreadyAUser = await User.findOne({ email });

  if (alreadyAUser) return res.status(409).json({ error: 'User with this email already exists' });

  const alreadyRegistered = await PendingUser.findOne({ email, userName });

  if (alreadyRegistered) {
    const passwordMatch = await bcrypt.compare(password, alreadyRegistered.password);
    if (passwordMatch) {
      return handleValidRegisteration(cleanData, res, true);
    }
    return res
      .status(409)
      .json({ error: 'Email already registered. Please login or use password recovery' });
  }
  return handleValidRegisteration(cleanData, res, false);
};

const handleValidRegisteration = async ({ userName, email, password }, res, updateUser) => {
  try {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const OTPresult = await sendOTP(otp, email);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!OTPresult) {
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    let result;
    if (updateUser) {
      result = await PendingUser.findOneAndUpdate(
        { email },
        { otp: hashedOTP, otp_expiry: otpExpiry },
      );
    } else {
      result = await PendingUser.create({
        userName,
        email,
        password: hashedPassword,
        otp: hashedOTP,
        otp_expiry: otpExpiry,
      });
    }
    const { password: _, otp: _otp, otp_expiry, ...responseObject } = result.toObject();
    console.log('Otp send vayo');
    return res
      .status(200)
      .json({ message: 'An Otp has been sent to your email', body: responseObject });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'This email is already taken',
        field: Object.keys(err.keyPattern)[0],
      });
    }
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

export { handleRegister };
