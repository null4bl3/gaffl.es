var express = require("express"),
    router = express.Router();

router.use("/dish", require("./dish"));
router.use("/ingredients", require("./ingredients"));
router.use("/user", require("./user"));
router.use("/weekplan", require("./weekplan"));

module.exports = router;
