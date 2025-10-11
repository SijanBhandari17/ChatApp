import { Router } from 'express';
import { handleFileUpload, handleMessageGet } from '../controllers/messagesController.js';
import authenticateRequest from '../middleware/authenicateJWT.js';
import upload from '../middleware/multerMiddleware.js';

const MessageRouter = Router();

MessageRouter.post('/upload', authenticateRequest, upload.any('files'), handleFileUpload);
MessageRouter.get('/', authenticateRequest, handleMessageGet);

export default MessageRouter;
