
var APP = angular.module("APP");
APP.controller("inspirationController", ["$scope", "$http", "Dishes", "Weekplans", "$state", function($scope, $http, Dishes, Weekplans, $state) {

$scope.typeState = false;
$scope.weeklist = Weekplans;
$scope.dishlist = Dishes;
$scope.default = "1.jpg";

$('#ins_container').hide();
$('#weekers').hide();


setTimeout(function(){
	$('#ins_container').fadeIn();

}, 50);




// HANDLING THE TAB NAVIGATION BETWEEN DISHES AND WEEKPLANS

	$scope.type = function(type){
		if (type === "weeks") {
				$scope.typeState = true;
				$("#week_lists").addClass('active');
					$('#weekers').fadeIn();
					$('#weekers').addClass('animated slideInLeft');
				$("#dish_lists").removeClass('active');
		} else {
				$scope.typeState = false;
				$("#dish_lists").addClass('active');
				$("#week_lists").removeClass('active');
		}
	};

// FORKING A DISH TO PERSONLALIZE IT

$scope.forkDish = function(dish){
	$state.go('forkdish', {
			dish_object: dish
	});
};

$scope.comment = function(dish){
	console.log(dish);
	$state.go('comment', {
		comment_object: {
			incoming: 'dish',
			dish: dish
		}
	});
};


$scope.pageSize = 6;
$scope.currentPage = 1;


}]);




// PAGINATION FILTERING

APP.filter('startFrom', function() {
	return function(data, start){
		return data.slice(start);
	};
});
