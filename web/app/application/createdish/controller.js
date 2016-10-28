
var APP = angular.module("APP");
APP.controller("createDishController", ["$scope", "$http", "Ingredients", "$cookies", "$state", "$route", function($scope, $http, Ingredients, $cookies, $state, $route) {
	$scope.ingredient_list = [];
	$scope.dish_score_human = 0;
	$scope.dish_score_data = 0;
	$scope.userdishes = [];
	$scope.dish = {};
	$scope.ingredients = Ingredients;
	$scope.ing = undefined;

	$('#submitter').prop("disabled", true);
	$('#empty').hide();
	$('#holdup').hide();
	$('#topbox').hide();
	$('#bottombox').hide();
	$('#rightThing').hide();


	$http({	method: 'GET', url: '/api/closed/user/auth' }).error(function(noauth){ $state.go('index'); });

	setTimeout(function(){

		$('#topbox').fadeIn();
		$('#topbox').addClass('animated slideInUp');
		$('#bottombox').fadeIn();
		$('#bottombox').addClass('animated slideInDown');
	}, 500);

	setTimeout(function(){
		$('#rightThing').fadeIn();
		$('#rightThing').addClass('animated slideInRight');

	}, 1200);

	$scope.addToList = function(toAdd){
		var tmp = toAdd;
		if (!toAdd) {
			$('#empty').show();
		} else {
			// IF THE INGREDIENT ALREADY EXISTS IN THE DATABASE JUST ADD IT TO THE LIST
			if (Ingredients.indexOf(toAdd) != -1) {
				$scope.ingredient_list.push(toAdd);
			} else {
				// ADD INGREDIENT TO THE DATABASE AND THEN ADD IT TO THE LIST
				$http({
					method: 'PUT',
					url: '/api/closed/ingredients/addnew',
					params: {
						name: toAdd
					}
				}).success(function(ok){
					$scope.ingredient_list.push(ok);
					$scope.ing = "";
				});
			}
		}
	};


// ON SELECTING AN ELEMENT FROM THE TYPEAHEAD

	$scope.onSelect = function ($item, $model, $label) {
	    $scope.$item = $item;
	    $scope.$model = $model;
	    $scope.$label = $label;

			$scope.dish_score_human = $scope.dish_score_human + $item.score_human;
			$scope.dish_score_data = $scope.dish_score_data + $item.score_data;
			$scope.ingredient_list.push($item);
			$scope.ing = "";
	};

// REMOVING A ITEM FROM THE INGREDIENT LIST

	$scope.removeItem = function(index){
		var tmp = $scope.ingredient_list[index].score_human;
		var tmp_data = $scope.ingredient_list[index].score_data;
		$scope.dish_score_human = $scope.dish_score_human - tmp;
		$scope.dish_score_data = $scope.dish_score_data - tmp_data;
		$scope.ingredient_list.splice(index, 1);
	};


// SUBMIT NEW DISH OBJECT


$scope.submitDish = function(){

	if ($scope.ingredient_list.length > 8) {
		$scope.dish_score_human = $scope.dish_score_human + 1;
	}
	$('#holdup').show();
	$http({
		method: 'PUT',
		url: '/api/closed/dish/addnew',
		params: {
			name: $scope.new_dish.name.$$rawModelValue,
			subtext: $scope.new_dish.subtext.$$rawModelValue,
			score: $scope.dish_score_human,
			score_data: $scope.dish_score_data,
			ing_numbers: $scope.ingredient_list.length,
			user: $cookies.get('id')
		}
	}).success(function(return_id){
		// ASSOCIATE THE INGREDIENTS WITH THE DISH ID IN A JOIN TABLE
		var tmp = $scope.ingredient_list.length;
		$scope.ingredient_list.forEach(function(object){
			$http({
				method: 'PUT',
				url: '/api/closed/ingredients/addjoin',
				params: {
					dish_id: return_id.insertId,
					Ingredient_id: object.id
				}
			}).error(function(err){
				console.log('something went wrong while adding ingredients');
			});
			tmp--;
			if (tmp === 0){
					$('#holdup').hide();
					$scope.ingredient_list = [];
					$scope.new_dish.name = "";
					$scope.new_dish.subtext = "";
					$scope.dish_score_human = 0;
					$('#dish_name').val("");
					toastr.success("Retten er blevet gemt");
					$route.reload();
					location.reload();
			}
		});
	}).error(function(err){
		console.log(err);
		console.log('thats an error');
	});
};


}]);
