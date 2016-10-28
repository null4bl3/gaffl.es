var APP = angular.module("APP");
APP.factory("Dishes", ['$http', '$q', function($http, $q) {

    var dishes = [];
    var defer = $q.defer();

    $http({
        method: 'GET',
        url: '/api/open/dish/getdishlist'
    }).success(function(data) {
        data.forEach(function(object) {
            $http({
                method: 'GET',
                url: '/api/open/ingredients/getone',
                params: {
                    id: object.id
                }
            }).success(function(ing_data) {
                if (object.subtext == "NULL") {
                    object.subtext = "...";
                }
                var tmp = Math.floor((Math.random() * 6) + 1);
                img = tmp + ".jpg";

                dishes.push({
                    id: object.id,
                    name: object.name,
                    subtext: object.subtext,
                    score: object.score,
                    score_data: object.score_data,
                    image: img,
                    ingredients: ing_data
                });
            });
        });
    });
    return dishes;
}]);
