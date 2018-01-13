const express = require('express');
const path = require('path');

// Middleware
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
  clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
  callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {id});
});

// Router
const router = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// app.use('/', router);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/' }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
