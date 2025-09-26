const { Router } = require('express');
const handleLogin = require('../controllers/loginController');
const { reqValidator } = require('../utils/validator');
const LoginRouter = Router();

LoginRouter.post('/', reqValidator, handleLogin);

module.exports = LoginRouter;
