import { Router } from 'express';

import {
  createGroupConversation,
  getOrCreateDirectConversation,
} from '../controllers/conversationController.js';

import { directConversationValidator, groupConversationvalidator } from '../utils/validator.js';

const ConversationRouter = Router();

ConversationRouter.post('/create/group', groupConversationvalidator, createGroupConversation);
ConversationRouter.post('/direct', directConversationValidator, getOrCreateDirectConversation);

export default ConversationRouter;
