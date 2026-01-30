const prisma = require('../lib/prisma');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMulter = multer({ storage });

const showUpload = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('upload');
};

const upload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).render('upload', {
        status: [{ msg: 'Something went wrong' }],
      });
    }

    if (file.size > 1000000) {
      return res.status(400).render('upload', {
        status: [{ msg: 'File size must be 1mb or less' }],
      });
    }

    await prisma.file.create({
      data: {
        title: file.originalname,
        link: file.path,
        uploaderId: req.user.id,
      },
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).render('upload', {
      status: [{ msg: 'Upload failed' }],
    });
  }
};

module.exports = { showUpload, upload, uploadMulter };
