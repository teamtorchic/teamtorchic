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

router.get('/post', controller.post.getAll);
router.post('/photo', upload.single('photo'), controller.post.photo);
router.post('/submit', controller.post.submit);
router.get('/votes/:dishId', controller.dishlikes.get);
router.post('/votes/upvote', controller.dishlikes.upVote);
router.post('/votes/downvote', controller.dishlikes.downVote);

module.exports = router;
