import { Router } from 'express';
import handleJWTRefresh from '../controllers/refreshJWTController.js';

const RefreshRouter = Router();

RefreshRouter.get('/', handleJWTRefresh);

export default RefreshRouter;
