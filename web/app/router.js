var APP = angular.module("APP");

APP.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function($locationProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("index", {
            url: "/",
            controller: "indexController",
            templateUrl: "application/index/template.html",

        });

    $stateProvider
        .state("about", {
            url: "/about",
            controller: "aboutController",
            templateUrl: "application/about/template.html",

        });

    $stateProvider
        .state("planner", {
            url: "/planner",
            controller: "weekPlannerController",
            templateUrl: "application/weekplanner/template.html",

        });

    $stateProvider
        .state("inspiration", {
            url: "/inspiration",
            controller: "inspirationController",
            templateUrl: "application/inspiration/template.html",
        });

    $stateProvider
        .state("createdish", {
            url: "/createdish",
            controller: "createDishController",
            templateUrl: "application/createdish/template.html",
            params: {
                userObject: null
            }
        });

    $stateProvider
        .state("profile", {
            url: "/profile",
            controller: "profileController",
            templateUrl: "application/profile/template.html",
            params: {
                userObject: null
            }
        });

    $stateProvider
        .state("forkdish", {
            url: "/forkdish",
            controller: "ForkDishController",
            templateUrl: "application/forkdish/template.html",
            params: {
                dish_object: null
            }
        });

    $stateProvider
        .state("comment", {
            url: "/comment",
            controller: "commentController",
            templateUrl: "application/comment/template.html",
            params: {
                comment_object: null
            }
        });

    $stateProvider
        .state("userdata", {
            url: "/userdata",
            controller: "userDataController",
            templateUrl: "application/userdata/template.html"
        });


    $urlRouterProvider
        .otherwise('/');

}]);
