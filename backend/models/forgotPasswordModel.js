import { mongoose } from 'mongoose';

const forgotPasswordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ForgotPassword = mongoose.model('forgot_password', forgotPasswordSchema);
export default ForgotPassword;
