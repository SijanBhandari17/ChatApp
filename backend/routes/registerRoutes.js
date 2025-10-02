import { Router } from 'express';
import { handleRegister } from '../controllers/registerController.js';
import handleOTP from '../controllers/otpController.js';
import { signupValidator } from '../utils/validator.js';

const RegisterRouter = Router();

RegisterRouter.post('/', signupValidator, handleRegister);
RegisterRouter.post('/otp', handleOTP);

export default RegisterRouter;
