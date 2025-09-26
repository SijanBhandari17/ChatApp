const forgotPassword = require('../models/forgotPasswordModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { validationResult, matchedData } = require('express-validator');

const handlePasswordReset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { password, token, id } = matchedData(req);

  try {
    const resetRecord = await forgotPassword.findOne({ userId: id });

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const sameAsOldPassword = await bcrypt.compare(password, user.password);

    if (sameAsOldPassword)
      return res
        .status(400)
        .json({ error: 'New password must be different from current password' });

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
