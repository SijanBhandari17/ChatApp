const { Router } = require('express');
const authenticateRequest = require('../middleware/authenicateJWT');
const handleHomeRequest = require('../controllers/homeController');
const HomeRouter = Router();

HomeRouter.get('/', authenticateRequest, handleHomeRequest);

module.exports = HomeRouter;
