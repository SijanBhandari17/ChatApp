const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: Number, requried: true },
});

const PendingUser = mongoose.model('User', pendingUserSchema);

module.exports = PendingUser;
