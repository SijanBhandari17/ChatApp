const forgotPassword = require('../models/forgotPasswordModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { validationResult, matchedData } = require('express-validator');

const handlePasswordReset = async (req, res) => {
  const { token, id } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const cleanData = matchedData(req);
  const { password } = cleanData;

  try {
    const resetRecord = await forgotPassword.findOne({ userId: id });
    console.log(resetRecord);
    if (!resetRecord || resetRecord.expiresAt < Date.now())
      return res.status(400).json({ error: 'Invalid or expired token' });

    if (resetRecord.used) return res.status(400).json({ error: 'Token already used' });

    if (!resetRecord.token) {
      return res.status(400).json({ error: 'Token not found' });
    }
    const isValid = await bcrypt.compare(token, resetRecord.token);
    if (!isValid) return res.status(400).json({ error: 'Invalid token' });

    const passwordHash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(resetRecord.userId, { password: passwordHash });

    resetRecord.used = true;
    resetRecord.save();

    return res.status(200).json({ message: 'Password Reset SuccessFul' });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err}` });
  }
};

module.exports = { handlePasswordReset };
