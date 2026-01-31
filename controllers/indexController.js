const prisma = require('../lib/prisma');

const showIndex = async (req, res) => {
  const folders = await prisma.folder.findMany({});
  console.log(folders);
  res.render('index', { folders });
};

module.exports = { showIndex };
