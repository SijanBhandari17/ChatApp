import { Router } from 'express';
import authenticateRequest from '../middleware/authenicateJWT.js';
import handleHomeRequest from '../controllers/homeController.js';

const HomeRouter = Router();

HomeRouter.get('/', authenticateRequest, handleHomeRequest);

export default HomeRouter;
