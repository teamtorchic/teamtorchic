const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const router = require('./routes.js');
const { localLogIn } = require('./middleware');
const { googleLogIn } = require('./middleware');


const PORT = process.env.PORT || 3000;

const app = express();
// Middleware
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use('/', router);
passport.use(localLogIn());
passport.use(googleLogIn());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, { id });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
app.get('/signup', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signup', failureFlash: true }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
