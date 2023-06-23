const router = require('express').Router();

router.use('/auth/', require('./users'));
router.use('/clients/', require('./clients'));

module.exports = router;
