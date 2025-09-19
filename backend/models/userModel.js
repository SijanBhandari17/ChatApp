const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String, required: true },
  profile_image: { type: String, required: true },
  last_active_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
