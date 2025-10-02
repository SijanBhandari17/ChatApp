import { Router } from 'express';
import { handleMessageSend } from '../controllers/messagesController.js';

const messageRouter = Router();

messageRouter.post('/send', handleMessageSend);

export default messageRouter;
