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

passport.serializeUser((user, done) => {
  done(null, user[0]);
});

passport.deserializeUser((username, done) => {
  models.users.findByUsername(username)
    .then((results) => {
      if (results.rowCount === 1) {
        done(null, results.rows[0]);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
});

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
  cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', router);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
