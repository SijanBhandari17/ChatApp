import { Router } from 'express';

import {
  createGroupConversation,
  getOrCreateDirectConversation,
} from '../controllers/conversationController.js';

import { directConversationValidator, groupConversationvalidator } from '../utils/validator.js';
import authenticateRequest from '../middleware/authenicateJWT.js';

const ConversationRouter = Router();

ConversationRouter.post(
  '/create/group',
  authenticateRequest,
  groupConversationvalidator,
  createGroupConversation,
);
ConversationRouter.post(
  '/direct',
  authenticateRequest,
  directConversationValidator,
  getOrCreateDirectConversation,
);

export default ConversationRouter;
