var APP = angular.module("APP");
APP.controller("userDataController", ["$scope", "$http", "Ingredients", "Dishes", "$stateParams", "$filter", "$cookies", function($scope, $http, Ingredients, Dishes, $stateParams, $filter, $cookies) {

    $scope.week_listing = true;
    $scope.dish_listing = false;
    $scope.profile_info = false;
    $scope.userdishes = [];
    var calcData = {};
    var calcMacData = {};
    $scope.user = {};
    $scope.user.name = $cookies.get('username');
    var dataHuman = [];
    var dataData = [];
    var ingData = [];
    var ingHuman = [];
    var ingIds = [];

    $scope.ghetto = false;
    $scope.burgojser = false;
    $scope.osterbro = false;



    $scope.userWeekList = [];

    $http({
      method: 'GET',
      url: '/api/closed/user/getaverage',
      params: {
        user: $cookies.get('id')
      }
    }).error(function(err){
      console.log(err);
    }).success(function(data){
      console.log(data);
      if (data.score < 16) {
        $scope.ghetto = true;
      }
      if(data.score > 16 && data.score < 20){
        $scope.burgojser = true;
      }
      if (data.score > 20) {
        $scope.osterbro = true;
      }
    });

$(document).ready(function() {
  setTimeout(function(){

    $('#fullpage').fullpage({
      easingcss3: 'ease',
      onLeave: function(index, nextIndex, direction){
        switch (nextIndex) {
          case 1 :
            break;
          case 2 :
            setData();
            break;
          case 3 :
            setDishData();
            break;
          case 4 :
            setIngredientData();
            break;
        }


      },
      afterLoad: function(anchorLink, index){


      },

    });
  }, 100);

});

    $scope.init = function() {



    };


var setData = function(){

  setTimeout(function(){

    setTimeout(function(){
      Dishes.forEach(function(item){
        dataHuman.push(item.score);
        dataData.push(item.score_data);
      });

    }, 200);

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

};


var setDishData = function(){

  setTimeout(function(){
    $('#chart_container').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Point For Madretter'
            },
            xAxis: {
                categories: $scope.labels
            },
            yAxis: {
                title: {
                    text: 'Points'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Menneske',
                data: dataHuman
            }, {
                name: 'Maskine',
                data: dataData
            }]
        });
   }, 600);
};





var setIngredientData = function(){

    setTimeout(function(){
      $('#chart_ing_container').highcharts({
              chart: {
                  type: 'line'
              },
              title: {
                  text: 'Point For Ingredienser'
              },
              xAxis: {
                  categories: ingIds
              },
              yAxis: {
                  title: {
                      text: 'Points'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  }
              },
              series: [{
                  name: 'Menneske',
                  data: ingHuman
              }, {
                  name: 'Maskine',
                  data: ingData
              }]
          });
     }, 600);
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
