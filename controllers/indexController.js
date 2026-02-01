const prisma = require('../lib/prisma');

const showIndex = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('index');
  }
  const folders = await prisma.folder.findMany({});
  return res.render('index', { folders });
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

  return res.render('folders', { folder });
};

module.exports = { showIndex, showFolder };
