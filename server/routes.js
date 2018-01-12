const controller = require('./controllers');
const router = require('express').Router();

router.get('/post', controller.post.getAll);
router.post('/submit', controller.post.submit);
router.get('/votes/:dishId', controller.dishlikes.get);
router.post('/votes/upvote', controller.dishlikes.upVote);
router.post('/votes/downvote', controller.dishlikes.downVote);


module.exports = router;
