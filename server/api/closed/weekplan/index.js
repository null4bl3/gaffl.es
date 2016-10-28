
var express = require("express");
var router = express.Router();

router.route("/addweekplan")
    .put(require("./ADDWEEKPLAN.js"));

router.route("/joinweekplan")
    .put(require("./JOINWEEKPLAN.js"));

router.route("/getuserweekplans")
    .get(require("./GETUSERWEEKPLANS.js"));

router.route("/getuserjoinweekplans")
    .get(require("./GETUSERJOINWEEKPLANS.js"));

module.exports = router;
