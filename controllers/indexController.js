const prisma = require('../lib/prisma');
const supabase = require('../lib/supabase');

const showIndex = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('index');
  }
  const folders = await prisma.folder.findMany({
    where: {
      ownerId: req.user.id,
    },
  });
  const files = await prisma.file.findMany({
    where: {
      uploaderId: req.user.id,
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

  return res.redirect('/');
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

  if (!file) {
    return res.status(404).send('File not found');
  }

  // Cloud storage handles the download
  res.redirect(file.link);
};

const deleteFile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.fileId),
    },
  });

  if (!file) return res.redirect('/');

  const path = file.link.split('/object/public/')[1];

  const { error } = await supabase.storage.from('uploads').remove([path]);

  if (error) {
    console.error('Supabase delete failed:', error);
    return res.status(500).send('Failed to delete file');
  }

  await prisma.file.delete({
    where: { id: file.id },
  });

  return res.redirect(req.get('referer') || '/');
};

module.exports = { showIndex, showFolder, renameFolder, deleteFolder, downloadFile, deleteFile };
