const PendingUser = require('../models/pendingUserModel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const sendOTP = require('./mailController');
const { validationResult, matchedData } = require('express-validator');

const handleRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const cleanData = matchedData(req);

  const { userName, email, password } = cleanData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const hashedOTP = await bcrypt.hash(otp, 10);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const alreadyRegistered = await PendingUser.findOne({ email: email });

  if (alreadyRegistered)
    return res
      .status(409)
      .json({ error: 'Email already registered. Please login or use password recovery' });

  try {
    const OTPresult = await sendOTP(otp, email);
    if (OTPresult) {
      const result = await PendingUser.create({
        userName,
        email,
        password: hashedPassword,
        otp: hashedOTP,
        otp_expiry: otpExpiry,
      });
      const { password, ...responseObject } = result.toObject();
      console.log('Otp send vayo');
      return res
        .status(200)
        .json({ message: 'An Otp has been sent to your email', body: responseObject });
    }
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err}` });
  }
};

module.exports = { handleRegister };
