const prisma = require('../lib/prisma');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const validateSignUp = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email is too long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be at least 6 characters'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),
];

const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email is too long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be at least 6 characters'),
];

const showLogin = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('/');
  }
  res.render('login');
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', {
      status: errors.array(),
      formData: req.body,
    });
  }

  passport.authenticate('local', (err, user, info) => {
    // if database error or server fail
    if (err) {
      return next(err);
    }

    // if user does not match
    if (!user) {
      return res.status(401).render('login', {
        status: [{ msg: info?.message }],
        formData: req.body,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

const showSignUp = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('/');
  }
  res.render('signup');
};

const signup = async (req, res) => {
  res.render('signup');
};

module.exports = { showLogin, showSignUp, validateSignUp, validateLogin, login, signup };
