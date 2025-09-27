const { Router } = require('express');
const {
  handlePasswordForgot,
  handlePasswordForgotResend,
} = require('../controllers/forgotPasswordController');
const { resetLimiter } = require('../middleware/rateLimiter');
const ForgotPasswordRouter = Router();

ForgotPasswordRouter.post('/', resetLimiter, handlePasswordForgot);
ForgotPasswordRouter.post('/resend', resetLimiter, handlePasswordForgotResend);

module.exports = ForgotPasswordRouter;
