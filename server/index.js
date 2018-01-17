const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const router = require('./routes.js');
const { localLogIn, googleLogIn } = require('./middleware');
const models = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

// const io = require('socket.io')(80);

// const restaurant = io.of('/restaurant');
// restaurant.on('connection', (socket) => {
// console.log(socket);
// });
// restaurant.emit('hi', 'everyone!');

passport.use(localLogIn());
passport.use(googleLogIn());

// Middleware
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/login', express.static(path.join(__dirname, '/../client/dist')));
app.use('/signup', express.static(path.join(__dirname, '/../client/dist')));
app.use('/home', express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.session.user;
    res.body = {
      data: username,
    };
    res.redirect('/home');
  } else {
    res.redirect('/posts');
  }
});

app.get('/session', (req, res) => {
  console.log ('hi');
  console.log (req.session);
  if (req.isAuthenticated()) {
    console.log ("in/hone", req.session.user);
    res.json({'a': 1});
  } else {
    res.redirect('/login');
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  models.users.findByUsername(username)
    .then((results) => {
      if (results.rowCount === 0) {
        models.users.create(username, password)
          .then(() => {
            res.redirect('/home');
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        res.send({ message: 'username already exists' });
      }
    });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.send(info);
    }
    req.session.regenerate(() => {
      req.session.user = user;
      res.body = {
        data: { username: user },
      };
      console.log ('inlogin redirect', res);
      res.redirect('/home');
    });
  })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.end();
});

app.get('/logout', (req, res) => {
  // res.clearCookie();
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
