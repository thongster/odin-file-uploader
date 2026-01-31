const prisma = require('../lib/prisma');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

// express validator
const { body, validationResult, matchedData } = require('express-validator');

const validateSignUp = [
  body('email')
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
  body('confirmpassword')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
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
    return res.redirect('/');
  }
  return res.render('login');
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
    return res.redirect('/');
  }
  return res.render('signup');
};

const signup = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signup', {
      status: errors.array(),
      formData: req.body,
    });
  }

  const { email, password } = matchedData(req);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword,
      },
    });
    return res.redirect('/');
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).render('signup', {
        status: [{ msg: 'Email already in use.' }],
        formData: req.body,
      });
    }

    console.error(error);
    return res.status(500).render('signup', {
      status: [{ msg: 'Something went wrong. Please try again.' }],
      formData: req.body,
    });
  }
};

const signout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
};

module.exports = { showLogin, showSignUp, validateSignUp, validateLogin, login, signup, signout };
