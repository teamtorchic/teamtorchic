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
  clientID: '862249102823-aalhroidkbb9r5ic3dfnfuinqb5nkd6b.apps.googleusercontent.com',
  clientSecret: 'Bh8gjZLqLzMPb1F3dh2UgxDk',
  callbackURL: 'https://eatchictorchic.herokuapp.com/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

// Router
const router = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
