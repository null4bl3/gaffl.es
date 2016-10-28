var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var tmp = req.query.average;
    var query = connection.query("SELECT id, score_data, score_human FROM ingredient ORDER BY score_data DESC, score_human DESC LIMIT 50", function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
};
