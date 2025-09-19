const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, requried: true },
  otp_expiry: { type: Date, required: true },
});

const PendingUser = mongoose.model('pendingUser', pendingUserSchema);

module.exports = PendingUser;
