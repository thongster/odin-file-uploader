const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.showIndex);
indexRouter.get('/folders', indexController.showFolder);
indexRouter.get('/folders/:folder', indexController.showFolder);
indexRouter.post('/folders/:folder/rename', indexController.renameFolder);
indexRouter.post('/folders/:folder/delete', indexController.deleteFolder);

module.exports = indexRouter;
