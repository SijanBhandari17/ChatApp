const { Router } = require('express');
const { handleRegister } = require('../controllers/registerController');
const signupValidator = require('../utils/signupValidator');
const handleOTP = require('../controllers/otpController');

const RegisterRouter = Router();
RegisterRouter.post('/', signupValidator, handleRegister);
RegisterRouter.post('/otp', handleOTP);

module.exports = RegisterRouter;
