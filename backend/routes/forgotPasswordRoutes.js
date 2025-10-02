import { Router } from 'express';
import {
  handlePasswordForgot,
  handlePasswordForgotResend,
} from '../controllers/forgotPasswordController.js';
import { resetLimiter } from '../middleware/rateLimiter.js';

const ForgotPasswordRouter = Router();

ForgotPasswordRouter.post('/', resetLimiter, handlePasswordForgot);
ForgotPasswordRouter.post('/resend', resetLimiter, handlePasswordForgotResend);

export default ForgotPasswordRouter;
