import { Router } from 'express';
import handleUserSeach from '../controllers/searchController.js';
import authenticateRequest from '../middleware/authenicateJWT.js';

const SearchRouter = Router();

SearchRouter.get('/users', authenticateRequest, handleUserSeach);

export default SearchRouter;
