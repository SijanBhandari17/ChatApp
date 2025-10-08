import { Router } from 'express';
import authenticateRequest from '../middleware/authenicateJWT.js';
import { getConversations, getUserInfo } from '../controllers/dashboardController.js';

const DashboardRouter = Router();
DashboardRouter.get('/conversations', authenticateRequest, getConversations);
DashboardRouter.get('/user-info', authenticateRequest, getUserInfo);

export default DashboardRouter;
