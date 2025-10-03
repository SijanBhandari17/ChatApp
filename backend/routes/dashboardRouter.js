import { Router } from 'express';
import authenticateRequest from '../middleware/authenicateJWT.js';
import { getConversations } from '../controllers/dashboardController.js';

const DashboardRouter = Router();
DashboardRouter.get('/', authenticateRequest, getConversations);

export default DashboardRouter;
