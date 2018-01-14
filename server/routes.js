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
router.get('/login', (req, res) => {
  res.redirect('/');
});
router.get('/signup', (req, res) => {
  res.redirect('/');
});
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
