import { Router } from 'express';
import { handlePasswordReset } from '../controllers/resetPasswordController.js';
import { resetPasswordValidator } from '../utils/validator.js';

const ResetPasswordRouter = Router();

ResetPasswordRouter.post('/', resetPasswordValidator, handlePasswordReset);

export default ResetPasswordRouter;
