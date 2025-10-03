import { Router } from 'express';
import {
  handlePasswordForgot,
  handlePasswordForgotResend,
} from '../controllers/forgotPasswordController.js';

const ForgotPasswordRouter = Router();

ForgotPasswordRouter.post('/', handlePasswordForgot);
ForgotPasswordRouter.post('/resend', handlePasswordForgotResend);

export default ForgotPasswordRouter;
