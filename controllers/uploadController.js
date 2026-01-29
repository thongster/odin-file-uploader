const prisma = require('../lib/prisma');

const showUpload = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  }
  res.render('upload');
};

const upload = async (req, res) => {};

module.exports = { showUpload, upload };
