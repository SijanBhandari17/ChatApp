const { body } = require('express-validator');

const userNameValidator = body('userName')
  .trim()
  .isLength({ min: 3 })
  .withMessage('Username must be at least 3 characters long');

const emailValidator = body('email').normalizeEmail().isEmail().withMessage('Enter a valid email');

const passwordValidator = body('password')
  .isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage('Password must be strong (8+ chars, 1 number, 1 symbol)');

const tokenValidator = body('token').notEmpty().withMessage('Token is required');

const idValidator = body('id').notEmpty().withMessage('Invalid user ID');

const signupValidator = [userNameValidator, emailValidator, passwordValidator];
const loginValidator = [emailValidator, passwordValidator];
const resetPasswordValidator = [passwordValidator, tokenValidator, idValidator];

module.exports = {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  passwordValidator,
};
