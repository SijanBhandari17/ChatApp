import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, equired: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String },
  profile_image: { type: String },
  last_active_at: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model('user', userSchema);

export default User;
