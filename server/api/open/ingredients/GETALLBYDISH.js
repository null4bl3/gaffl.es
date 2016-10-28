var connection = require('../../Connection.js');

// SELECT name
// FROM ingredient_join, ingredient
// WHERE ingredient.id = ingredient_join.ingredient_id AND ingredient_join.dish_id = 12
// GROUP BY ingredient.id

module.exports = function(req, res) {
    var query = connection.query('SELECT name	FROM ingredient_join, ingredient WHERE ingredient.id = ingredient_join.ingredient_id AND ingredient_join.dish_id = ' + req.query.id + '	GROUP BY ingredient.id', function(err, result) {
        if (err) {
            console.log(err.code);
            res.send(err.code);
        } else {
            res.send(result);
        }
    });
};
