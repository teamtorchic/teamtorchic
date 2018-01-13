const express = require('express');
const path = require('path');
const session = require('express-session');

// Middleware
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const flash = require('flash');

const router = require('./routes.js');

const app = express();
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

const PORT = process.env.PORT || 3000;

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/../client/dist')));

passport.use(new LocalStrategy((username, password, done) => done(null, { username, passport })));
// User.findOne({ username: username }, function(err, user) {
//   if (err) { return done(err); }
//   if (!user) {
//     return done(null, false, { message: 'Incorrect username.' });
//   }
//   if (!user.validPassword(password)) {
//     return done(null, false, { message: 'Incorrect password.' });
//   }
//   return done(null, user);


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
  clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
  callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

app.use('/', router);
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
app.get('/signup', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signup', failureFlash: true }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
