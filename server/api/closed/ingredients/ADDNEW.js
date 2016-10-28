var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var data = {
        name: req.query.name
    };

    var query = connection.query('INSERT INTO ingredient SET ? ', data, function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send({
                id: result.insertId,
                name: req.query.name
            });
        }
    });


};
