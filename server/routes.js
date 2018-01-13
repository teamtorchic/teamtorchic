const controller = require('./controllers');
const router = require('express').Router();
const multer = require('multer');

const storageObject = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageObject });
const passport = require('passport');

router.get('/post', controller.post.getAll);
router.post('/photo', upload.single('photo'), controller.post.photo);
router.post('/submit', controller.post.submit);
router.get('/votes/:dishId', controller.dishlikes.get);
router.post('/votes/upvote', controller.dishlikes.upVote);
router.post('/votes/downvote', controller.dishlikes.downVote);
router.post('/signup', controller.signup.submit);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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
