const PendingUser = require('../models/pendingUserModel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const sendOTP = require('./mailController');

const handleRegister = async (req, res) => {
  const { userName, email, password } = req.body();
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const alreadyRegistered = await PendingUser.findOne({ email: email });

  if (alreadyRegistered)
    return res
      .status(409)
      .json({ error: 'Email already registered. Please login or use password recovery' });

  try {
    const result = await PendingUser.create({
      userName,
      email,
      password: hashedPassword,
      otp,
    });
    if (result) {
      const OTPresult = sendOTP(otp);
      if (OTPresult)
        return res
          .status(200)
          .json({ message: 'An Otp has been sent to your email', body: result.toObject() });
    }
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err}` });
  }
};

module.exports = { handleRegister };
