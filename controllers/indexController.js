const prisma = require('../lib/prisma');

const showIndex = async (req, res) => {
  const folders = await prisma.folder.findMany({});
  console.log(folders);
  console.log(req.user);
  res.render('index', { folders });
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

  res.render('files', { folder });
};

module.exports = { showIndex, showFolder };
