
var APP = angular.module("APP");
APP.controller("commentController", ["$scope", "$http", "Ingredients", "$cookies", "$state", "$route", "$stateParams", function($scope, $http, Ingredients, $cookies, $state, $route, $stateParams) {

	$scope.commentList = ["Det er en helt fantastisk ret", "Se det er noget for mig", "Jeg kan lide hvad jeg ser", "Denne her. Bare med en banan i", "Jeg har det som om at jeg havde spist alt mad der var at spise her i verden. Men så prøvede jeg denne her ret, og indså at jeg tog fejl. Total klamt"];

	$scope.list = [
		{
			username: 'Hr Spagnum',
			time: "12/06-16 - 19:20",
			comment: "Denne her. Bare med en banan i"
		},
		{
			username: 'spoleormen',
			time: "12/06-16 - 20:42",
			comment: "Jeg har det som om at jeg havde spist alt mad der var at spise her i verden. Men så prøvede jeg denne her ret, og indså at jeg tog fejl. Total klamt"
		},
	];



	$scope.commentObject = {};

	if (!$stateParams.comment_object) {
		$state.go('inspiration');
	}

	var incoming = $stateParams.comment_object.incoming;
	if (incoming === 'dish') {
		$scope.commentObject = $stateParams.comment_object.dish;
	}

	console.log(incoming);

	console.log($stateParams.comment_object.dish.name);


	$scope.addComment = function(content){
		console.log(content);
		$scope.list.push(		{
					username: $cookies.get('username'),
					time: "17/06-16 - 09:22",
					comment: content
				});
				toastr.success("Kommentar tilføjet !");
				$scope.comment = "";
	};


}]);
