var APP = angular.module('APP');
APP.directive('compTopbar', [function() {

    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/comp-topbar/template.html',
        controller: ('Topbar_Controller', ['$scope', '$http', '$filter', '$stateParams', '$q', '$state', '$cookies', '$route', function($scope, $http, $filter, $stateParams, $q, $state, $cookies, $route) {


            $scope.dev = false;
            $scope.user = {};
            $scope.credentials = {};
            $scope.new_user = {};


            // SIGNUP FOR NEW ACCOUNT

            $scope.sign_up = function() {
                console.log($scope.new_user);

                $http({
                    method: 'PUT',
                    url: '/api/open/user/signup',
                    params: {
                        username: $scope.new_user.username,
                        email: $scope.new_user.email,
                        password: $scope.new_user.password
                    }
                }).success(function(data) {
                  console.log(data);
                    location.reload();
                });
            };

            // LOGIN TO ACCOUNT

            $scope.sign_in = function() {

                $http({
                    method: 'GET',
                    url: '/api/open/user/login',
                    params: {
                        username: $scope.credentials.username,
                        password: $scope.credentials.password
                    }
                }).success(function(result) {
                    $scope.user = result;
                    console.log(result);
                    toastr.success("Velkommen tilbage " + result.username);
                }).error(function(err) {
                    console.log(err);
                    toastr.error("Fejl i brugernavn eller kodeord");
                });
            };

            // HANDLING THE USERS NAVIGATION TO THE USER PROFILE PAGE

            $scope.toProfile = function() {
                $state.go("profile", {
                    userObject: {
                        username: $cookies.get('username'),
                    }
                });
            };

            $scope.toProfileData = function() {
                $state.go("userdata", {
                    userObject: {
                        username: $cookies.get('username'),
                    }
                });
            };

            // SIGNING OUT DELETES SESSION TOKEN FROM THE USERS DATABASE ENTRY
            // AND DELETES THE USERS COOKIES

            $scope.sign_out = function() {
                $http({
                    method: 'PUT',
                    url: '/api/closed/user/logout'
                }).success(function() {
                  $scope.user = {};
                    location.reload();
                }).error(function() {
                    toastr.error('Var ikke i stand til at logge din bruger ud');
                });
            };

        }])
    };

}]);
