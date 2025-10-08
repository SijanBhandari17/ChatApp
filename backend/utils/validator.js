import { body } from 'express-validator';

const userNameValidator = body('userName')
  .trim()
  .isLength({ min: 5 })
  .withMessage('Username must be at least 5 characters long')
  .escape();

const emailValidator = body('email').normalizeEmail().isEmail().withMessage('Enter a valid email');

const passwordValidator = body('password')
  .isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage('Password must be strong (8+ chars, 1 number, 1 symbol)')
  .escape();

const tokenValidator = body('token').notEmpty().withMessage('Token is required');

const idValidator = body('id').notEmpty().withMessage('Invalid user ID');

const titleValidator = body('title').notEmpty().withMessage('Enter a valid title').trim().escape();

const directParticipantsValidor = body('participants')
  .isArray({ max: 2 })
  .withMessage('Participants must be an array and min 2 people')
  .notEmpty()
  .withMessage('Participants array cannot be empty');

const groupParticipantsValidor = body('participants')
  .isArray({ min: 2 })
  .withMessage('Participants must be an array and min 3 people')
  .notEmpty()
  .withMessage('Participants array cannot be empty');

const adminValidator = body('created_by').notEmpty().withMessage('Admin is missing');

const signupValidator = [userNameValidator, emailValidator, passwordValidator];
const loginValidator = [emailValidator, passwordValidator];
const resetPasswordValidator = [passwordValidator, tokenValidator, idValidator];
const directConversationValidator = [directParticipantsValidor];
const groupConversationvalidator = [groupParticipantsValidor, titleValidator, adminValidator];

export {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
  passwordValidator,
  directConversationValidator,
  groupConversationvalidator,
};
