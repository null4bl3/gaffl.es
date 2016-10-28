var express = require("express");
var router = express.Router();

router.route("/auth")
    .get(require("./AUTH.js"));

router.route("/login")
    .put(require("./LOGIN.js"));

router.route("/logout")
    .put(require("./LOGOUT.js"));

router.route("/setaverage")
    .put(require("./SETAVERAGE.js"));

router.route("/getaverage")
    .get(require("./GETAVERAGE.js"));

router.route("/calculate")
    .get(require("./CALCULATE.js"));

router.route("/calculate_machine")
    .get(require("./CALCULATE_MACHINE.js"));

module.exports = router;
