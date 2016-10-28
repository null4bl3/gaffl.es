var connection = require('../../Connection.js');

module.exports = function(req, res) {

    var query = connection.query('SELECT *	FROM ingredient_join, ingredient WHERE ingredient.id = ingredient_join.ingredient_id AND ingredient_join.dish_id = ' + req.query.id + '	GROUP BY ingredient.id', function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};
