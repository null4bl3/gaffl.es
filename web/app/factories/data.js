var APP = angular.module("APP");
APP.factory("Data", ['$http', '$q', 'Dishes', function($http, $q, Dishes) {

    var data = [];

		var ite = Dishes.length;
		Dishes.forEach(function(item) {
				data.push({
					human: item.score,
					computer: item.score_data
				});
				ite--;
				if (ite < 1) {
				}
		});

    return data;
}]);
