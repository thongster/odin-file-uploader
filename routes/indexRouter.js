const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.showIndex);
indexRouter.get('/folders', indexController.showFolder);
indexRouter.get('/folders/:folder', indexController.showFolder);
indexRouter.post('/folders/:folder/rename', indexController.renameFolder);
indexRouter.post('/folders/:folder/delete', indexController.deleteFolder);
indexRouter.get('/:fileId/download', indexController.downloadFile);
indexRouter.get('/folders/:folder/:fileId/download', indexController.downloadFile);

module.exports = indexRouter;
