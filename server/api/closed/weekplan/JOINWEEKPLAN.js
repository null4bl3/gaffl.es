var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var data = {
        weekplan_id: req.query.weekplan_id,
        dish_id: req.query.dish_id
    };

    console.log(data);

    var query = connection.query('INSERT INTO weekplan_join SET ?', data, function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });


};
