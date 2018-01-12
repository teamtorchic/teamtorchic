const controller = require('./controllers');
const router = require('express').Router();

router.get('/post', controller.post.getAll);
router.post('/submit', controller.post.submit);
router.get('/votes/:dishId', controller.dishlikes.get);

module.exports = router;
