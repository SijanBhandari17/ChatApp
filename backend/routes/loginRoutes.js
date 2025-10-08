// loginRoutes.js

import { Router } from 'express';
import handleLogin from '../controllers/loginController.js';
import { loginValidator } from '../utils/validator.js';

const LoginRouter = Router();

LoginRouter.post('/', loginValidator, handleLogin);

export default LoginRouter;
