const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

// /login
authRouter.get('/login', authController.showLogin);

authRouter.get('/signup', authController.showSignUp);

module.exports = authRouter;
