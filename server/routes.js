const controller = require('./controllers');
const router = require('express').Router();
const passport = require('passport');

router.get('/post', controller.post.getAll);
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
