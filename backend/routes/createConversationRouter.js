import { Router } from 'express';
import { createGroupConversation } from '../controllers/conversationController.js';

const conversationRouter = Router();

conversationRouter.post('/group', createGroupConversation);

export default conversationRouter;
