import { Router } from 'express';
import { handleMessageSend } from '../controllers/messagesController.js';

const MessageRouter = Router();

MessageRouter.post('/send/direct', handleMessageSend);
MessageRouter.post('/send/group', handleMessageSend);

export default MessageRouter;
