const { Router } = require('express');
const handleJWTRefresh = require('../controllers/refreshJWTController');
const authenticateRequest = require('../middleware/authenicateJWT');
const RefreshRouter = Router();

RefreshRouter.get('/', handleJWTRefresh);

module.exports = RefreshRouter;
