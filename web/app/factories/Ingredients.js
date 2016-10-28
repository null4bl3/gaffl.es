var APP = angular.module("APP");
APP.factory("Ingredients", ['$http', function($http) {

    var ingredients = [];

    $http({
        method: 'GET',
        url: '/api/open/ingredients/getall'
    }).success(function(data) {
        data.forEach(function(object) {
            ingredients.push({
                id: object.id,
                name: object.name,
                category: object.category,
                score_human: object.score_human,
                score_data: object.score_data
            });
        });
    });

    return ingredients;
}]);
