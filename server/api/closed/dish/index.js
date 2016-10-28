var express = require("express"),
    router = express.Router();

router.route("/addnew")
    .put(require("./ADDNEW.js"));

router.route("/getfiltered")
    .get(require("./GETFILTERED.js"));

router.route("/getuserdishes")
    .get(require("./GETUSERDISHES.js"));

module.exports = router;
