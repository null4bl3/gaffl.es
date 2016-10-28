var connection = require('../../Connection.js');
var passport = require("passport");



module.exports = function(req, res, next) {

  passport.authenticate("local", function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.status('401').send();
      req.logIn(user, function(err) {
          if (err) return next(err);
          return res.send(user);
      });

  })(req, res, next);
};
