const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const prisma = require('../lib/prisma');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await prisma.findUnique(email);

      // if user does not exist
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // password match
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // success
      console.log('login success');
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.findUnique(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
