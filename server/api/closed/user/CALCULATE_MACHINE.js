var connection = require('../../Connection.js');
var Promise = require('bluebird');

module.exports = function(req, res){

		connection.query("SELECT * FROM dish", function(err, data){
			if(err) console.log(err);
			else {
				var lngth = data.length;
				var count = data.length;
				var tmp = 0;

				data.forEach(function(item){
					tmp = tmp + parseInt(item.score_data);
					count--;
					if(count < 1){
						console.log(tmp);
						toReturn = String(tmp / lngth);
					var obj = {
						totalNumDishes: lngth,
						totalValue: String(tmp),
						allAverage: toReturn
					};
								res.send(obj);
					}
				});
			}
		});
};
