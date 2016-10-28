var connection = require('../../Connection');

module.exports = function(req, res) {
    connection.query("SELECT * FROM user WHERE id = " + connection.escape(req.query.id) + " AND token = " + connection.escape(req.query.token), function(err, result) {
        if (err) {
            res.statusCode = 401;
        } else {
            connection.query("SELECT * FROM dish WHERE user = " + connection.escape(req.query.id), function(err, result) {
                if (err) {
                    console.log(err);
                    res.statusCode = 401;
                } else {
                    res.send(result);
                }
            });
        }
    });



};
