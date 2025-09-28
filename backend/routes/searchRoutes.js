const { Router } = require('express');
const handleUserSeach = require('../controllers/searchController');

const SearchRouter = Router();
SearchRouter.get('/users', handleUserSeach);

module.exports = SearchRouter;
