var connection = require('../../Connection.js');
var Promise = require('bluebird');

module.exports = function(req, res) {

    first(req.query.user).then(function(user_id) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT average FROM average_junction WHERE user_id = " + user_id, function(err, result) {
                if (err) console.log(err);
                else {
                    var tmp = 0.0;
                    var count = result.length;
                    var length = result.length;
                    result.forEach(function(val) {
                        tmp = tmp + parseFloat(val.average) / length;
                        count--;
                        if (count === 0) {
                            resolve(tmp);
                        }
                    });
                }
            });
        });
    }).then(function(average_user_score) {
        res.send({
            score: average_user_score
        });
    });


    function first(the_user) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM user WHERE id = " + the_user, function(err, result) {
                if (err) console.log(err);
                else {
                    resolve(result[0].id);
                }
            });
        });
    }

};
