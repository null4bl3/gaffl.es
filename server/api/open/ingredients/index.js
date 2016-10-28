var express = require("express"),
    router = express.Router();

router.route("/getall")
    .get(require("./GETALL.js"));

router.route("/getone")
    .get(require("./GETONE.js"));

router.route("/getallbydish")
    .get(require("./GETALLBYDISH.js"));

module.exports = router;
