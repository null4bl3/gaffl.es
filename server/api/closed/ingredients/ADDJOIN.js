var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var data = {
        dish_id: req.query.dish_id,
        Ingredient_id: req.query.Ingredient_id
    };

    var query = connection.query('INSERT INTO ingredient_join SET ? ', data, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err.code);
        } else {
            res.send();
        }
    });


};
