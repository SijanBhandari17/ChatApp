const { Router } = require('express');
const { handleRegister } = require('../controllers/registerController');
const signupValidator = require('../utils/signupValidator');

const RegisterRouter = Router();
RegisterRouter.post('/', signupValidator, handleRegister);

module.exports = RegisterRouter;
