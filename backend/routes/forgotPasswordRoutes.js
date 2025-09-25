const { Router } = require('express');
const { handlePasswordForgot } = require('../controllers/forgotPasswordController');
const ForgotPasswordRouter = Router();

ForgotPasswordRouter.post('/', handlePasswordForgot);

module.exports = ForgotPasswordRouter;
