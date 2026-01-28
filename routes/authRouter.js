const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');

authRouter.get('/', authController.showLogin);

module.exports = authRouter;
