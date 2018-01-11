const controller = require('./controllers');
const router = require('express').Router();

router.get('/post', controller.post.getAll);
router.get('/votes/:dishId', controller.dishlikes.get);
router.post('/votes', controller.dishlikes.post);


module.exports = router;
