var connection = require('../../Connection.js');

module.exports = function(req, res) {

    // USING A OUTER JOIN QUERY TO SELECT THE RELATED DATA FROM THE JOIN TABLE AND ITS DISH COUNTERPART.
    // I HAVE USED OUTER LEFT JOIN TO MAKE SURE I SELECTED EVERY ENTRY INCLUDING ENTRIES THAT HAD A VALUE OF "0"
    // IF A USER HAD CHOSEN TO NOT ADD A DISH TO EVERY DAY OF A WEEKPLANs

    connection.query("SELECT weekplan_join.dish_id, dish.* FROM weekplan_join LEFT OUTER JOIN dish ON weekplan_join.dish_id=dish.id WHERE weekplan_join.weekplan_id = " + connection.escape(req.query.weekplan_id), function(err, result) {
        if (err) console.log(err);
        else {
            res.send(result);
        }
    });




};
