const controller = require('./controllers');
const router = require('express').Router();
const multer = require('multer');
const { isLoggedIn } = require('./middleware');

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

router.get('/comments', controller.comments.get);
router.post('/comments', controller.comments.post);
router.get('/restaurants', controller.restaurants);
router.get('/dishes', controller.dishes);

router.get('/posts', controller.post.getAll);
router.post('/submit', isLoggedIn, upload.single('image'), controller.post.submit);
router.post('/votes/upvote', isLoggedIn, controller.dishlikes.upVote);
router.post('/votes/downvote', isLoggedIn, controller.dishlikes.downVote);
router.get('/user/profile', isLoggedIn, controller.user.getProfile);
router.get('/:username', isLoggedIn, controller.user.getAllPost);

module.exports = router;
