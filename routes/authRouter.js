const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

// /login
authRouter.get('/', authController.showLogin);

module.exports = authRouter;
