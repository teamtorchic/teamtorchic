const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

module.exports = {
  localLogIn: () => new LocalStrategy((username, password, done) => {
    models.users.checkUserCredential(username, password)
      .then((results) => {
        if (results.rowCount === 1) {
          const { username } = results.rows[0];
          done(null, username);
        } else {
          done(null, false, { message: 'Incorrect username or password' });
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
  googleLogIn: () => new GoogleStrategy({
    clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
    clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
    callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
  }, (accessToken, refreshToken, profile, done) => done(null, profile)),
  isLoggedIn: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};
