
var APP = angular.module("APP");
APP.controller("ForkDishController", ["$scope", "$http", "Ingredients", "$cookies", "$state", "$stateParams", function($scope, $http, Ingredients, $cookies, $state, $stateParams) {
	$scope.ingredient_list = [];
	$scope.dish_score = 0;
	$scope.userdishes = [];
	$scope.new_dish = {};
	$scope.ingredients = Ingredients;

	$('#submitter').prop("disabled", true);
	$('#empty').hide();
	$('#holdup').hide();


// SINCE THIS IS FORKED CONTROLLER. IT SHOULD ONLY BE ACCESSIBLE
// ALONG WITH A DISH OBJECT. IF NO DISH OBJECT IS PREsENT.
// THE USER IS REDIRECTED TO THE "INSPIRATION" SECTION.
	if (!$stateParams.dish_object) {
		$state.go('inspiration');
	}

// ASSIGNING THE PARAMETERS FROM THE STATEPARAMS OBJECT
// TO THE LOCAL DISH OBJECT

	$scope.name = $stateParams.dish_object.name;
	$scope.subtext = $stateParams.dish_object.subtext;
	$scope.dish_score = $stateParams.dish_object.score;
	$scope.ingredient_list = $stateParams.dish_object.ingredients;

	if ($cookies.get('id')) {
		// AUTHORIZE AND VERIFY USER BY USING THE SESSION TOKEN
		$http({
			method: 'GET',
			url: '/api/closed/user/auth',
			params: {
				id: $cookies.get('id'),
				token: $cookies.get('token')
			}
		}).success(function(data){
			console.log(data);
		}).error(function(err){
				toastr.error("Du har ikke adgang til denne side");
				$state.go('inspiration');
		});
	} else {
		$state.go('inspiration');
	}


	$('#submitter').prop("disabled", true);
	$('#empty').hide();
	$('#holdup').hide();

	$scope.dish = {};

	$scope.ingredients = Ingredients;
	$scope.ing = undefined;

	$scope.addToList = function(toAdd){
		var tmp = toAdd;
		if (!toAdd) {
			$('#empty').show();
		} else {
			// IF THE INGREDIENT ALREADY EXISTS IN THE DATABASE JUST ADD IT TO THE LIST
			if (Ingredients.indexOf(toAdd) != -1) {
				$scope.ingredient_list.push(toAdd);
				console.log(toAdd);
			} else {
				// ADD INGREDIENT TO THE DATABASE AND THEN ADD IT TO THE LIST
				$http({
					method: 'PUT',
					url: '/api/closed/ingredients/addnew',
					params: {
						name: toAdd
					}
				}).success(function(ok){
					console.log(ok);
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

			console.log($item);
			$scope.dish_score = $scope.dish_score + $item.score_human;
			$scope.ingredient_list.push($item);
			$scope.ing = "";
	};

	$scope.removeItem = function(index){
		var tmp = $scope.ingredient_list[index].score_human;
		$scope.dish_score = $scope.dish_score - tmp;
		$scope.ingredient_list.splice(index, 1);
	};


// SUBMIT NEW DISH OBJECT


$scope.submitDish = function(){

	if ($scope.ingredient_list.length > 8) {
		$scope.dish_score = $scope.dish_score + 1;
	}
	$('#holdup').show();
	$http({
		method: 'PUT',
		url: '/api/closed/dish/addnew',
		params: {
			name: $scope.name,
			subtext: $scope.subtext,
			score: $scope.dish_score,
			ing_numbers: $scope.ingredient_list.length,
			user: $cookies.get('id')
		}
	}).success(function(return_id){
		console.log(return_id);
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
					$scope.name = "";
					$scope.subtext = "";
					$scope.dish_score = 0;
					$('#dish_name').val("");
					$state.go('planner');
			}
		});
	}).error(function(err){
		console.log(err);
		console.log('thats an error');
	});
};


}]);
