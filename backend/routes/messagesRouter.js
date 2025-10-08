import { Router } from 'express';
import { handleMessageGet, handleMessageSend } from '../controllers/messagesController.js';
import authenticateRequest from '../middleware/authenicateJWT.js';

const MessageRouter = Router();

MessageRouter.post('/send/direct', authenticateRequest, handleMessageSend);
MessageRouter.post('/send/group', authenticateRequest, handleMessageSend);
MessageRouter.get('/', authenticateRequest, handleMessageGet);

export default MessageRouter;
