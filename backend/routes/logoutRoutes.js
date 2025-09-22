const { Router } = require('express');
const handleLogout = require('../controllers/logoutController');
const LogoutRouter = Router();

LogoutRouter.get('/', handleLogout);

module.exports = LogoutRouter;
