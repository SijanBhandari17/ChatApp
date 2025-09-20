const { Router } = require('express');
const handleLogin = require('../controllers/loginController');
const LoginRouter = Router();

LoginRouter.post('/', handleLogin);

module.exports = LoginRouter;
