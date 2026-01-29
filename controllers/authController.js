const prisma = require('../lib/prisma');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const showLogin = async (req, res) => {
  res.render('login');
};

const showSignUp = async (req, res) => {
  res.render('signup');
};

module.exports = { showLogin, showSignUp };
