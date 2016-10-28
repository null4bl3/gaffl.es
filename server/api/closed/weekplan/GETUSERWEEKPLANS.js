var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var query = connection.query('SELECT * FROM weekplan WHERE user = ' + connection.escape(req.query.id), function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });
};
