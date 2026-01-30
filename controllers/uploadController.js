const prisma = require('../lib/prisma');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadMulter = multer({ storage });

const showUpload = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('upload');
};

const upload = async (req, res) => {};

module.exports = { showUpload, upload, uploadMulter };
