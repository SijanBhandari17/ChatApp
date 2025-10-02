import { Router } from 'express';
import handleLogout from '../controllers/logoutController.js';

const LogoutRouter = Router();

LogoutRouter.get('/', handleLogout);

export default LogoutRouter;
