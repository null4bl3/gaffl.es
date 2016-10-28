var connection = require('../../Connection.js');

module.exports = function(req, res){

	var data = {
		name: req.query.name,
		subtext: connection.escape(req.query.subtext),
		score: req.query.score,
		score_data: req.query.score_data,
		ing_numbers: req.query.ing_numbers,
		user: req.query.user
	};

console.log(data);
			var query = connection.query('INSERT INTO dish SET ? ', data, function(err, result) {
		if(err) {
			console.log(err.code);
			res.send(err.code);
		}
		else {
			res.send(result);
		}
	});


};
