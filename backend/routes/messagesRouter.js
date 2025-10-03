import { Router } from 'express';
import { handleMessageSend } from '../controllers/messagesController.js';
import { getOrCreateDirectConversation } from '../controllers/conversationController.js';
import { directConversationValidator, groupConversationvalidator } from '../utils/validator.js';

const MessageRouter = Router();

MessageRouter.post(
  '/send/direct',
  directConversationValidator,
  getOrCreateDirectConversation,
  handleMessageSend,
);
MessageRouter.post('/send/group', handleMessageSend);

export default MessageRouter;
