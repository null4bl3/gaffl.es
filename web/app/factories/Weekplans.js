var APP = angular.module("APP");
APP.factory("Weekplans", ['$http', '$q', function($http, $q) {

    var weekplans = [];

    $http({
        method: 'GET',
        url: '/api/open/weekplan/getall',
    }).success(function(data) {
        data.forEach(function(object) {
            $http({
                method: 'GET',
                url: '/api/closed/weekplan/getuserjoinweekplans',
                params: {
                    weekplan_id: object.id
                }

            }).success(function(returned) {
                weekplans.push({
                    weeklist: object,
                    dishes: returned
                });
            });

        });
    });
    return weekplans;
}]);
