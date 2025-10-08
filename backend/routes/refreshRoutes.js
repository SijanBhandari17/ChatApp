import { Router } from 'express';
import handleJWTRefresh from '../controllers/refreshJWTController.js';

const RefreshRouter = Router();

RefreshRouter.get('/accesstoken', handleJWTRefresh);

export default RefreshRouter;
