const { body } = require('express-validator');

const signupValidator = [
  body('userName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

  body('email').normalizeEmail().isEmail().withMessage('Enter a valid email'),

  body('password')
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('Password must be strong (8+ chars, 1 number, 1 symbol)'),
];

const reqValidator = [
  body('email').notEmpty().withMessage('Email is required'),

  body('password').notEmpty().withMessage('Password is required'),
];

const passwordValidator = [
  body('password')
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('Password must be strong (8+ chars, 1 number, 1 symbol)'),
];

module.exports = { signupValidator, reqValidator, passwordValidator };
