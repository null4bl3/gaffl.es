var express = require("express"),
    router = express.Router();

router.route("/addnew")
    .put(require("./ADDNEW.js"));

router.route("/addjoin")
    .put(require("./ADDJOIN.js"));


router.route("/getfiltered")
    .get(require("./GETFILTERED.js"));


module.exports = router;
