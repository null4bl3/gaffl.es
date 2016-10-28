var express = require("express");
var router = express.Router();

router.route("/getall")
    .get(require("./GETALL.js"));

module.exports = router;
