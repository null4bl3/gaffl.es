
var express = require('express');
var router = express.Router();

router.use('/open', require('./open'));
router.use("/closed", require("./closed"));

module.exports = router;
