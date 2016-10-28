var connection = require('../../Connection.js');

module.exports = function(req, res) {


    var query = connection.query('SELECT * FROM dish', function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });

};
