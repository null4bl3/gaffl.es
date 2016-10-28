var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var data = {
        user: req.query.id,
        username: req.query.username,
        week_score: req.query.week_score
    };

    var query = connection.query('INSERT INTO weekplan SET ?', data, function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });


};
