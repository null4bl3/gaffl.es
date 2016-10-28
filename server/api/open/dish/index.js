var express = require("express"),
    router = express.Router();

router.route("/getone")
    .get(require("./GETONE.js"));

router.route("/getall")
    .get(require("./GETALL.js"));

router.route("/getdishlist")
    .get(require("./GETDISHLIST.js"));

module.exports = router;
