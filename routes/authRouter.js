const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

// /login
authRouter.get('/login', authController.showLogin);
authRouter.post('/login', authController.validateLogin, authController.login);

authRouter.get('/signup', authController.showSignUp);
authRouter.post('/signup', authController.validateSignUp, authController.signup);

authRouter.get('/signout', authController.signout);

module.exports = authRouter;
