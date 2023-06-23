const router = require('express').Router();

router.use('/', require('./post.client'));
router.use('/', require('./get.client[id]'));
router.use('/', require('./get.clients'));

module.exports = router;
