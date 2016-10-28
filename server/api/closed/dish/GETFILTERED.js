var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var tmp = req.query.average;
    var query = connection.query('SELECT * FROM `dish` WHERE score > ' + tmp + '- 4 AND score < ' + tmp + ' + 4', function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
};
