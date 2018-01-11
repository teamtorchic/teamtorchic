const controller = require('./controllers');
const router = require('express').Router();

router.get('/post', controller.post.getAll);

module.exports = router;
