import { body } from 'express-validator';

const userNameValidator = body('userName')
  .trim()
  .isLength({ min: 5 })
  .withMessage('Username must be at least 5 characters long');

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

export { signupValidator, loginValidator, resetPasswordValidator, passwordValidator };
