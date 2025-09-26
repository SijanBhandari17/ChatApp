const { Router } = require('express');
const { handlePasswordReset } = require('../controllers/resetPasswordController');
const { resetPasswordValidator } = require('../utils/validator');
const ResetPasswordRouter = Router();

ResetPasswordRouter.post('/', resetPasswordValidator, handlePasswordReset);

module.exports = ResetPasswordRouter;
