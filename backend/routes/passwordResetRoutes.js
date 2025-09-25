const { Router } = require('express');
const { handlePasswordReset } = require('../controllers/resetPasswordController');
const { passwordValidator } = require('../utils/validator');
const ResetPasswordRouter = Router();

ResetPasswordRouter.post('/', passwordValidator, handlePasswordReset);

module.exports = ResetPasswordRouter;
