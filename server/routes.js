const controller = require('./controllers');
const router = require('express').Router();
const multer = require('multer');

const storageObject = multer.diskStorage({

// var path = path.join(__dirname, '/../client/dist');

  destination(req, file, cb) {
    cb(null, './images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storageObject });
const passport = require('passport');

router.get('/comments', controller.comments.get);
router.post('/comments', controller.comments.post);

router.get('/restaurants', controller.restaurants);
router.get('/dishes', controller.dishes);

router.get('/post', controller.post.getAll);
router.post('/submit', upload.single('image'), controller.post.submit);
router.get('/votes/:dishId', controller.dishlikes.get);
router.post('/votes/upvote', controller.dishlikes.upVote);
router.post('/votes/downvote', controller.dishlikes.downVote);
router.post('/signup', controller.signup.submit);
router.get('/users/:username', (req, res) => {
  const { username } = req.params;
  res.send({ message: username });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log ("req.user", req.session)
    if (err) { return next(err); }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, (e) => {
      if (e) { return next(e); }
      return res.redirect(`/users/${user[0]}`);
    });
  })(req, res, next);
});
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passport.authenticate('google'), controller.user.landing);

module.exports = router;
