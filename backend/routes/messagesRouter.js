import { Router } from 'express';
import { handleMessageSend } from '../controllers/messagesController.js';
import getOrCreateDirectConversation from '../controllers/conversationController.js';

const messageRouter = Router();

messageRouter.post('/send', getOrCreateDirectConversation, handleMessageSend);

export default messageRouter;
