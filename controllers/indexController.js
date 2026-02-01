const prisma = require('../lib/prisma');

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

module.exports = { showIndex, showFolder };
