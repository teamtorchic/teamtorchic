const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');
const models = require('../models');

module.exports = (app, user) => {
  app.use(session({ secret: 'some secret value' }));    
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config
  passport.use(new LocalStrategy(user.authenticate()));

  passport.serializeUser((user, done) => {
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    models.users.findByUsername(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
      console.log('no im not serial');
      done(err, user);
    });
  });
};