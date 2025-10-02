import { Router } from 'express';
import handleUserSeach from '../controllers/searchController.js';

const SearchRouter = Router();

SearchRouter.get('/users', handleUserSeach);

export default SearchRouter;
