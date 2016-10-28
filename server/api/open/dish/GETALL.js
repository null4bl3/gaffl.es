var connection = require('../../Connection.js');

module.exports = function(req, res) {

    console.log();
    var query = connection.query('SELECT * FROM dish', function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });
};
