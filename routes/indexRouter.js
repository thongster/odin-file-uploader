const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.showIndex);
indexRouter.get('/folders/:folder', indexController.showFolder);

module.exports = indexRouter;
