const { Router } = require('express');
const { handleRegister } = require('../controllers/registerController');
const authRouter = Router();

authRouter.post('/', handleRegister);

module.exports = authRouter;
