var APP = angular.module('APP');
APP.directive('compPresentation', [function() {

    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/comp-presentation/template.html',
        controller: ('Presentation_Controller', ['$scope', '$http', '$filter', '$stateParams', '$q', '$state', '$cookies', '$route', 'Data', function($scope, $http, $filter, $stateParams, $q, $state, $cookies, $route, Data) {

          console.log(Data);


        }])
    };

}]);
