const { Router } = require('express');
const handleLogin = require('../controllers/loginController');
const { loginValidator } = require('../utils/validator');
const LoginRouter = Router();

LoginRouter.post('/', loginValidator, handleLogin);

module.exports = LoginRouter;
