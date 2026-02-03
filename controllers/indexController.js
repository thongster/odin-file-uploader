const prisma = require('../lib/prisma');
const path = require('path');

const showIndex = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('index');
  }
  const folders = await prisma.folder.findMany({});
  const files = await prisma.file.findMany({
    where: {
      folderId: null,
    },
    include: {
      uploader: true,
    },
  });
  return res.render('index', { folders, files });
};

const showFolder = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  const folder = await prisma.folder.findUnique({
    where: {
      ownerId_name: {
        ownerId: req.user.id,
        name: req.params.folder,
      },
    },
  });

  const files = await prisma.file.findMany({
    where: {
      folderId: folder.id,
    },
    include: {
      uploader: true,
    },
  });

  return res.render('folders', { folder, files });
};

const renameFolder = async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('in here');
    return res.redirect('/');
  }

  const newFolder = await prisma.folder.update({
    where: {
      ownerId_name: {
        ownerId: req.user.id,
        name: req.params.folder,
      },
    },
    data: {
      name: req.body.folderName,
    },
  });

  return res.redirect(`/folders/${newFolder.name}`);
};

const deleteFolder = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  const folder = await prisma.folder.findUnique({
    where: {
      ownerId_name: {
        ownerId: req.user.id,
        name: req.params.folder,
      },
    },
  });

  await prisma.folder.delete({
    where: {
      id: folder.id,
    },
  });
};

const downloadFile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.fileId),
    },
  });

  res.download(file.link, file.title, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Error downloading the file.', file.link);
    } else {
      console.log('File successfully sent for download.', file.link);
    }
  });
};

module.exports = { showIndex, showFolder, renameFolder, deleteFolder, downloadFile };
