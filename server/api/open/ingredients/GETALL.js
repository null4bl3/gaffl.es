var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var query = connection.query('SELECT * FROM ingredient', function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });
};
