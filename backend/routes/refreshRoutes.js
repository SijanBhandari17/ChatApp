import { Router } from 'express';
import handleJWTRefresh from '../controllers/refreshJWTController.js';
import authenticateRequest from '../middleware/authenicateJWT.js';

const RefreshRouter = Router();

RefreshRouter.get('/', handleJWTRefresh);

export default RefreshRouter;
