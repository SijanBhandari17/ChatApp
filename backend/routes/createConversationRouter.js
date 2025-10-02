import { Router } from 'express';
import handleConversationCreation from '../controllers/conversationController.js';

const conversationRouter = Router();

conversationRouter.post('/', handleConversationCreation);

export default conversationRouter;
