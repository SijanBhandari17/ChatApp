const { Router } = require('express');
const { handleRegister } = require('../controllers/registerController');
const handleOTP = require('../controllers/otpController');
const { signupValidator } = require('../utils/validator');

const RegisterRouter = Router();
RegisterRouter.post('/', signupValidator, handleRegister);
RegisterRouter.post('/otp', handleOTP);

module.exports = RegisterRouter;
