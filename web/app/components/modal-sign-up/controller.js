
var APP = angular.module("APP");
APP.directive("modalSignUp", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/modal-sign-up/template.html",
        controller: ["$scope", function($scope) {


        }]
    };
}]);
