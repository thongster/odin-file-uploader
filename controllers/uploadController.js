const prisma = require('../lib/prisma');
const multer = require('multer');
const path = require('path');

// express validator
const { body, validationResult, matchedData } = require('express-validator');
const validateFolderName = [
  body('folderName')
    .trim()
    .notEmpty()
    .withMessage('Folder name is required')
    .matches(/^[a-zA-Z0-9 _\-()]+$/)
    .withMessage(
      'Folder name can only contain letters, numbers, spaces, hyphens, underscores, and parentheses'
    ),
];

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folderId;

    if (folder) {
      cb(null, path.join(__dirname, `../uploads/${folder}`));
    } else {
      cb(null, path.join(__dirname, '../uploads'));
    }
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

  const folders = await prisma.folder.findMany({});

  return res.render('upload', { folders });
};

const upload = async (req, res) => {
  const folders = await prisma.folder.findMany({});
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).render('upload', {
        status: [{ msg: 'Something went wrong' }],
        folders,
      });
    }

    if (file.size > 1000000) {
      return res.status(400).render('upload', {
        status: [{ msg: 'File size must be 1mb or less' }],
        folders,
      });
    }

    let folderId = null;

    if (req.body.folder !== 'None') {
      const folder = await prisma.folder.findUnique({
        where: {
          ownerId_name: {
            ownerId: req.user.id,
            name: req.body.folder,
          },
        },
      });

      folderId = folder.id;
    }

    await prisma.file.create({
      data: {
        title: file.originalname,
        link: file.path,
        mimeType: file.mimetype,
        size: file.size,
        uploaderId: req.user.id,
        folderId: folderId,
      },
    });
    return res.redirect(req.body.folder === 'None' ? '/' : `/folders/${req.body.folder}`);
  } catch (error) {
    console.log(error);
    const folders = await prisma.folder.findMany({});
    return res.status(500).render('upload', {
      status: [{ msg: 'Upload failed' }],
      folders,
    });
  }
};

const createFolder = async (req, res) => {
  const errors = validationResult(req);
  const folders = await prisma.folder.findMany({});
  const files = await prisma.file.findMany({
    where: {
      folderId: null,
    },
  });

  if (!errors.isEmpty()) {
    return res.status(400).render('index', {
      status: errors.array(),
      formData: req.body,
      folders,
      files,
    });
  }

  const { folderName } = matchedData(req);

  await prisma.folder.create({
    data: {
      name: folderName,
      ownerId: req.user.id,
    },
  });

  return res.redirect('/');
};

module.exports = { showUpload, upload, uploadMulter, validateFolderName, createFolder };
