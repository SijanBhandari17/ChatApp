import { Router } from 'express';
import { handleMessageSend } from '../controllers/messagesController.js';
import { getOrCreateDirectConversation } from '../controllers/conversationController.js';

const messageRouter = Router();

messageRouter.post('/send/direct', getOrCreateDirectConversation, handleMessageSend);
messageRouter.post('/send/group', handleMessageSend);

export default messageRouter;
