const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

module.exports = {
  localLogIn: () => new LocalStrategy((username, password, done) => {
    models.users.checkUserCredential(username, password)
      .then((results) => {
        if (results.rowCount === 1) {
          done(null, results.rows[0]);
        } else {
          done(null, false, { message: 'Incorrect username or password' });
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
  // Use the GoogleStrategy within Passport.
  // Strategies in Passport require a `verify` function, which accept
  // credentials (in this case, an accessToken, refreshToken, and Google
  // profile), and invoke a callback with a user object.
  googleLogIn: () => new GoogleStrategy({
    clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
    clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
    callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
  }, (accessToken, refreshToken, profile, done) => done(null, profile)),
};
