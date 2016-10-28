var APP = angular.module("APP");
APP.controller("profileController", ["$scope", "$http", "Ingredients", "Dishes", "$stateParams", "$filter", "$cookies", function($scope, $http, Ingredients, Dishes, $stateParams, $filter, $cookies) {

    $scope.week_listing = true;
    $scope.dish_listing = false;
    $scope.profile_info = false;
    $scope.userdishes = [];
    var calcData = {};
    var calcMacData = {};
    $scope.user = {};
    $scope.user.name = $cookies.get('username');

    var ingData = [];
    var ingHuman = [];
    var ingIds = [];

    $scope.userWeekList = [];

    $scope.init = function() {
        var tmp = [];
        var dishlist = [];

        $http({
            method: 'GET',
            url: '/api/closed/weekplan/getuserweekplans',
            params: {
                id: $cookies.get('id')
            }
        }).success(function(data) {
            data.forEach(function(object) {
                $http({
                    method: 'GET',
                    url: '/api/closed/weekplan/getuserjoinweekplans',
                    params: {
                        weekplan_id: object.id
                    }
                }).success(function(returned) {
                    $scope.userWeekList.push({
                        weeklist: object,
                        dishes: returned
                    });
                });
            });

        });

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
        });

    };


// SORTING THE USER RELATED DATA TO BE DISPLAYED

$scope.type = function(type){

  switch (type) {
    case "week_listing":
      // $scope.typeState = true;
      $("#week_listing").addClass('active');
      $("#dish_listing").removeClass('active');
      $("#profile_info").removeClass('active');
      $scope.week_listing = true;
      $scope.dish_listing = false;
      $scope.profile_info = false;
      break;
    case "dish_listing":
      $("#dish_listing").addClass('active');
      $("#week_listing").removeClass('active');
      $("#profile_info").removeClass('active');
      $scope.week_listing = false;
      $scope.dish_listing = true;
      $scope.profile_info = false;
      break;
    case "profile_info":
      $("#profile_info").addClass('active');
      $("#week_listing").removeClass('active');
      $("#dish_listing").removeClass('active');
      $scope.week_listing = false;
      $scope.dish_listing = false;
      $scope.profile_info = true;
      setData();
      break;

  }

};

var setData = function(){

  setTimeout(function(){

  var overall = parseInt(calcData.allAverage);
  var overallmac = parseInt(calcMacData.allAverage);


    $('#chacon').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gennemsnit Med Menneskelig Vurdering'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Point'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Dit gennemsnit',
                data: [$scope.user.average]

            }, {
                name: 'Overordnet gennemsnit',
                data: [overall]

            }]
        });


            $('#chaconmac').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Gennemsnit Med Maskin Vurdering'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Point'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Dit gennemsnit',
                        data: [$scope.user.average]

                    }, {
                        name: 'Overordnet gennemsnit',
                        data: [overallmac]

                    }]
                });

  }, 500);

  // $(document).ready(function() {
      $('#fullpage').fullpage({
        easingcss3: 'ease',
        onLeave: function(index, nextIndex, direction){
          console.log('nextIndex ' + nextIndex);
          console.log('direction ' + direction);
          console.log('index ' + index);
          switch (nextIndex) {
            case 1 :
              console.log("FØRSTE SIDE MED BOKSE");
              // $('#top_boxes').addClass('animated slideOutRight');
              // $('#bottom_boxes').addClass('animated slideOutLeft');
              break;
            case 2 :
              // $('#chart_container').addClass('animated fadeOut');
              // $('#chart_container').toggle();
              console.log("DIAGRAM SIDEN");
              break;
            case 3 :
              console.log('nextIndex is ' + index);
              break;
            case 4 :
              console.log('nextIndex is ' + index);
              break;
          }
        },
        afterLoad: function(anchorLink, index){

          console.log('after loading section');
          console.log(index);
          switch (index) {
            case 1 :
              // $('#top_boxes').show();
              // $('#top_boxes').addClass('animated slideInLeft');
              // $('#bottom_boxes').show();
              // $('#bottom_boxes').addClass('animated slideInRight');
              console.log('index is ' + index);
              break;
            case 2 :
              $('#chart_container').show();
              $('#chart_container').addClass('animated slideInUp');
              console.log('index is ' + index);
              break;
            case 3 :
              console.log('index is ' + index);
              break;
            case 4 :
              console.log('index is ' + index);
              break;
          }
        },

      // });
  });

};

$http({
  method: 'GET',
  url: '/api/closed/user/getaverage',
  params: {
    user: $cookies.get('id')
  }
}).error(function(err){
  console.log(err);
}).success(function(data){
  $scope.user.average = data.score;
    $http({
      method: 'GET',
      url: '/api/closed/user/calculate'
    }).error(function(err) {
      console.log(err);
    }).success(function(ret){
        calcData = ret;
    });
}).finally(function(data){
  $http({
    method: 'GET',
    url: '/api/closed/user/calculate_machine'
  }).error(function(err) {
    console.log(err);
  }).success(function(ret){
      calcMacData = ret;
  });
});

$http({
  method: 'GET',
  url: '/api/closed/ingredients/getfiltered'
}).error(function(err){
    console.log(err);
}).success(function(data){
  data.forEach(function(item){
    ingIds.push(item.id);
    ingData.push(parseFloat(item.score_data));
    ingHuman.push(item.score_human);
  });
});





}]);
