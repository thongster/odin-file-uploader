const { Router } = require('express');
const uploadRouter = Router();
const uploadController = require('../controllers/uploadController');

uploadRouter.get('/upload', uploadController.showUpload);
uploadRouter.post('/upload', uploadController.uploadMulter.single('file'), uploadController.upload);

uploadRouter.post('/', uploadController.validateFolderName, uploadController.createFolder);

module.exports = uploadRouter;
