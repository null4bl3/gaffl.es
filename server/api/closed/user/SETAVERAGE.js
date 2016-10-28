var connection = require('../../Connection.js');


module.exports = function(req, res) {
    var data = {
        user_id: req.query.user_id,
        average: req.query.average_score
    };

    connection.query("INSERT INTO average_junction SET ? ", data, function(err, result) {
        if (err) console.log(err);
        else {
            // ALL GOOD
            res.send();
        }
    });
};
