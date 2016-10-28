var APP = angular.module("APP");
APP.controller("weekPlannerController", ["$scope", "$http", "Ingredients", "Dishes", "_", "$filter", "$state", "$cookies", "$route", function($scope, $http, Ingredients, Dishes, _, $filter, $state, $cookies, $route) {
    $scope.ingredient_list = [];
    $scope.dish_list = Dishes;
    $scope.dish_score = 0;
    $scope.weekplan_score = 0;
    $scope.shopping_list = [];
    $scope.final_shopping_list = [];
    $scope.dayArray = [];
    $scope.weekArray = [];
    $scope.focus = {};
    $scope.choice = false;
    $scope.switch = false;
    $scope.average_score = 0;
    $scope.suggestion_list = [];
    $scope.extra_ingredient = "";
    $scope.default = "1.jpg";
    $scope.userdishes = [];
    $scope.ingredients = Ingredients;
    $scope.user = {};

    $('#main_contain').hide();

    setTimeout(function() {
        $('#lefter').hide();
        $('#righter').hide();
        $('#detailer').hide();
        $('#plan_container').hide();
        $('#resetters').hide();
        $('#detailer_selected').hide();
        $('#onwards').hide();

        $('#monday1').hide();
        $('#monday2').hide();
        $('#tuesday1').hide();
        $('#tuesday2').hide();
        $('#wednesday1').hide();
        $('#wednesday2').hide();
        $('#thursday1').hide();
        $('#thursday2').hide();
        $('#friday1').hide();
        $('#friday2').hide();
        $('#saturday1').hide();
        $('#saturday2').hide();
        $('#sunday1').hide();
        $('#sunday2').hide();


    }, 20);
    setTimeout(function() {
        $('#main_contain').fadeIn();
        $('#lefter').fadeIn();
        $('#lefter').addClass('animated slideInUp');
        $('#righter').fadeIn();
        $('#righter').addClass('animated slideInUp');
        $('#detailer').fadeIn();
        $('#detailer').addClass('animated slideInDown');
        $('#resetters').fadeIn();
        $('#resetters').addClass('animated slideInUp');

        $('#monday1').fadeIn();
        $('#monday1').addClass('animated slideInDown');
        $('#tuesday1').fadeIn();
        $('#tuesday1').addClass('animated slideInDown');
        $('#wednesday1').fadeIn();
        $('#wednesday1').addClass('animated slideInDown');
        $('#thursday1').fadeIn();
        $('#thursday1').addClass('animated slideInDown');
        $('#friday1').fadeIn();
        $('#friday1').addClass('animated slideInDown');
        $('#saturday1').fadeIn();
        $('#saturday1').addClass('animated slideInDown');
        $('#sunday1').fadeIn();
        $('#sunday1').addClass('animated slideInDown');
        $('#onwards').fadeIn();
        $('#onwards').addClass('animated slideInRight');

        $('#plan_container').fadeIn();
        $('#plan_container').addClass('animated slideInUp');

        $('#monday2').fadeIn();
        $('#monday2').addClass('animated slideInUp');
        $('#tuesday2').fadeIn();
        $('#tuesday2').addClass('animated slideInUp');
        $('#wednesday2').fadeIn();
        $('#wednesday2').addClass('animated slideInUp');
        $('#thursday2').fadeIn();
        $('#thursday2').addClass('animated slideInUp');
        $('#friday2').fadeIn();
        $('#friday2').addClass('animated slideInUp');
        $('#saturday2').fadeIn();
        $('#saturday2').addClass('animated slideInUp');
        $('#sunday2').fadeIn();
        $('#sunday2').addClass('animated slideInUp');

    }, 500);

    if ($cookies.get('id')) {
        $scope.user.id = $cookies.get('id');
        $http({
            method: 'GET',
            url: '/api/closed/dish/getuserdishes',
            params: {
                id: $cookies.get('id'),
                token: $cookies.get('token')
            }
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
                    $scope.userdishes.push({
                        id: object.id,
                        name: object.name,
                        subtext: object.subtext,
                        score: object.score,
                        score_data: object.score_data,
                        image: object.image,
                        ingredients: ing_data
                    });
                });
            });
        }).error(function(err) {
            toastr.error("Din bruger kunne ikke godkendes");
        }).finally(function() {
            $http({
                method: 'GET',
                url: '/api/closed/user/getaverage',
                params: {
                    user: $cookies.get('id')
                }
            }).success(function(av) {
                var tmp = parseInt(av.score);
                $scope.average_score = tmp;
            });
        });
    }


    // SELECTING A DISH AND GRANT FOCUS TO SEE DETAILS OF THE DISH OBJECT

    $scope.select_dish = function(selection) {
        // console.log($scope.dish_list[selection - 1]);
        console.log(selection);
        $scope.focus = selection;
        $('#detailer').addClass('animated slideOutUp');
        $('#detailer').hide();

        $scope.choice = true;
        setTimeout(function() {
            $('#detailer_selected').show();
            $('#detailer_selected').addClass('animated slideInDown');
        }, 100);

        var tmp = Math.floor((Math.random() * 6) + 1);
        $scope.default = tmp + ".jpg";
        // $scope.focus = $scope.dish_list[selection-1];
    };

    // SELECTING A DISH FROM THE SUGGESTION LIST ON THE RIGHT SIDE

    $scope.select_suggestion_dish = function(selection) {
        $('#detailer').addClass('animated slideOutUp');
        $('#detailer').hide();

        $scope.choice = true;
        setTimeout(function() {
            $('#detailer_selected').show();
            $('#detailer_selected').addClass('animated slideInDown');
        }, 100);

        var tmp = Math.floor((Math.random() * 6) + 1);
        $scope.default = tmp + ".jpg";
        $scope.focus = $scope.suggestion_list[selection];
    };

    // ASSIGNING A DISH TO ONE OR MORE DAYS IN A WEEK

    $scope.assignToDay = function(dish, day) {
        if ($.isEmptyObject(dish)) {
            toastr.error("Vælg en ret i højre eller venstre side for at tilføje den til en ugedag!");
        } else {
            $scope.dayArray[day] = dish;
            $scope.weekplan_score = $scope.weekplan_score + dish.score;
            var tmp = parseInt($scope.weekplan_score / $scope.dayArray.length);
            $scope.average_score = tmp;

            dish.ingredients.forEach(function(object) {
                $scope.shopping_list.push({
                    ass: day,
                    name: object.name,
                    category: object.category,
                    amount: 1
                });
            });
        }
    };

    // REMOVING A DISH FROM A WEEKDAY AND CLEARING INGREDINTS FROM THE SHOPPING LIST,
    // USING BACKSWARDS LOGIC TO ACCOUNT FOR THE LENGTH CHANGING WHEN REMOVING ELEMENT

    $scope.removeDish = function(index) {
        $scope.weekplan_score = $scope.weekplan_score - $scope.dayArray[index].score;
        for (i = $scope.shopping_list.length - 1; i >= 0; i--) {
            if ($scope.shopping_list[i].ass == index) $scope.shopping_list.splice(i, 1);
        }
        $scope.dayArray[index] = "";
    };



    // FUNCTION WATCHING THE AVERAGE SCORE FOR CHANGES TO
    // REFRESH SUGGESTIONS BASED ON THE WEEK PLAN AVERAGE

    $scope.$watch('average_score', function(the_score) {
        console.log(the_score);
        if (the_score === 0) {
            $scope.suggestion_list = Dishes;
        } else {
            $http({
                method: 'GET',
                url: '/api/closed/dish/getfiltered',
                params: {
                    average: the_score
                }
            }).success(function(data) {
                $scope.suggestion_list = [];
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
                        $scope.suggestion_list.push({
                            id: object.id,
                            name: object.name,
                            subtext: object.subtext,
                            score: object.score,
                            image: object.image,
                            ingredients: ing_data
                        });
                    });
                });
            });
        }
    });

    // NAVIGATION TO THE SHOPPING LIST ALSO HANDLES
    // SORTING THE SHOPPING LIST TO INCREMENT AMOUNT
    // OF AN INGREDIENT INSTEAD OF THE INGREDIENT
    // APPEARING ON THE LIST TWICE

    var tmpList = [];
    $scope.toShoppingList = function() {
        $scope.shopping_list.forEach(function(object) {
            var elementPos = $scope.final_shopping_list.map(function(x) {
                return x.name;
            }).indexOf(object.name);

            if (elementPos == -1) {
                $scope.final_shopping_list.push(object);
            } else {
                $scope.final_shopping_list[elementPos] = {
                    ass: $scope.final_shopping_list[elementPos].ass,
                    name: $scope.final_shopping_list[elementPos].name,
                    amount: $scope.final_shopping_list[elementPos].amount = $scope.final_shopping_list[elementPos].amount + 1
                };
            }
        });
        $scope.switch = true;
    };

    // NAVIGATING BACK TO THE PLANNER

    $scope.backToPlanner = function() {
        $scope.final_shopping_list = [];
        $scope.switch = false;
    };

    //ADDING ADDITIONAL ITEMS TO THE SHOPPING LIST

    $scope.addToList = function(ing_inc) {
        $scope.shopping_list.push({
            name: ing_inc,
            amount: 1
        });
        $('#extra_ingredient').val("");
    };

    $scope.onTheSelect = function($item, $model, $label) {
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;

        console.log('her');

        $scope.final_shopping_list.push($item);
        $scope.extra_ingredient = "";
        $('#extra_ingredient').val("");

    };


    // SAVING THE WEEKPLAN. I AM USING A TRY/CATCH TO ITERATE
    // THROUGH THE SHORT WEEKLIST TO WRITE A FALSE VALUE TO
    // ALL DAYS THAT HAVE NOT HAD A DISH ASSIGNED TO IT

    $scope.saveWeekplan = function() {

        if (!$cookies.get('id')) {
            toastr.error('Du skal oprette en bruger for at kunne gemme din ugeplan');
        } else {
            toastr.info("Gemmer ugeplan ..");
            for (var i = 0; i < 7; i++) {
                try {
                    var tmp = $scope.dayArray[i].id;
                } catch (variable) {
                    $scope.dayArray[i] = {
                        id: -1
                    };
                }
            }

            // USING A TIMEOUT SIMPLY TO ALLOW THE ASYNCHRONOUS
            // FUNCTION TO PLOW THROUGHT THE WEEKLIST AND SEND
            // THE DATA TO THE BACKEND. THIS IS NECESSARY BECAUSE
            // WHILE THE SUCCESS() FUNCTION WORKS AS A ANGULAR
            // PROMISE THAT WILL "WAIT" FOR THE RETURN MESSAGE
            // THE FOR LOOP IS NOT A PROMISE IN ITSELF SO
            // JAVASCRIPT WILL MOVE ON BEFORE IT IS FINISHED.

            setTimeout(function() {
                $http({
                    method: 'PUT',
                    url: '/api/closed/weekplan/addweekplan',
                    params: {
                        id: $cookies.get('id'),
                        username: $cookies.get('username'),
                        week_score: $scope.weekplan_score,
                    }
                }).success(function(data) {

                    for (var i = 0; i < 7; i++) {
                        $http({
                            method: 'PUT',
                            url: '/api/closed/weekplan/joinweekplan',
                            params: {
                                weekplan_id: data.insertId,
                                dish_id: $scope.dayArray[i].id
                            }
                        });
                    }
                    toastr.success("Ugeplanen blev gemt");
                    $route.reload();
                }).finally(function() {
                    $http({
                        method: 'PUT',
                        url: '/api/closed/user/setaverage',
                        params: {
                            user_id: $cookies.get('id'),
                            average_score: $scope.average_score
                        }
                    }).success(function() {
                        $state.go('profile');
                    });
                });
            }, 1000);
        }
    };

    // A MANUAL FUNCTION FOR READING AND UPDATING THE DATA SCORE
    // THE FUNCTION GETS ALL IDS OF INGREDIENTS USED IN ANY Dishes
    // GETS VALUE FOR HOW MANY TIMES EACH INGREDIENT HAVE BEEN userdishes
    // DIVIDES IT BY THE NUMBERS OF DISHES THAT EXISTS AND WRITE THE
    // RESULT TO THE INGREDIENT

    $scope.dataSauce = function(selection) {
        $http({
            method: 'GET',
            url: '/api/closed/computation'
        }).success(function() {
            toastr.success("Computation went well");
        }).error(function(err) {
            toastr.error("Something went wrong");
        });
    };


    // NAVIGATING BETWEEN THE TWO STATES OF THE PLANNER

    $scope.changeFocus = function(inc) {
        if (inc === "list_all") {
            $scope.dish_list = Dishes;
            $('#list_all').addClass('active');
            $('#list_own').removeClass('active');

        } else {
            $scope.dish_list = $scope.userdishes;
            $('#list_own').addClass('active');
            $('#list_all').removeClass('active');
        }
    };

}]);
