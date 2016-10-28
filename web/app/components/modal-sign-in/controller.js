
var APP = angular.module("APP");
APP.directive("modalSignIn", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/modal-sign-in/template.html",
        controller: ["$scope", function($scope) {


        }]
    };
}]);
