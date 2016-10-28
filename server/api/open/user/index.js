
var express = require("express");
var router = express.Router();

router.route("/signup")
    .put(require("./SIGNUP.js"));

router.route("/login")
    .get(require("./LOGIN.js"));

module.exports = router;
