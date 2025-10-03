import { Router } from 'express';
import { createGroupConversation } from '../controllers/conversationController.js';
import { groupConversationvalidator } from '../utils/validator.js';

const ConversationRouter = Router();

ConversationRouter.post('/group', groupConversationvalidator, createGroupConversation);

export default ConversationRouter;
