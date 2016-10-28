
var express = require('express');
var router = express.Router();

router.use('/', express.static(process.env.APP_CLIENT_FOLDER));

router.use('/api', require('./api'));

module.exports = router;
