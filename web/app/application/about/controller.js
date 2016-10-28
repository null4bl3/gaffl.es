var APP = angular.module("APP");
APP.controller("aboutController", ["$scope", "$http", "Dishes", "Data", "$q", "$cookies", 'Ingredients', function($scope, $http, Dishes, Data, $q, $cookies, Ingredients) {

  $('#titletron').hide();
  $('#subtron').hide();
  $('#subsubtron').hide();
  $('#green').hide();

  $('#box2').hide();
  $('#box3').hide();
  $('#topbox1').hide();
  $('#topbox2').hide();
  $('#topbox3').hide();
  $('#chart_container').hide();

    var dataHuman = [];
    var dataData = [];
    var ingDig = [];
    var ingHum = [];
    var dishdata = [];
    var xData = [];
    var yData = [];
    $scope.labels = [];


    setTimeout(function(){

      $('#box1').show();
      $('#box1').addClass('animated slideInUp');
      $('#box2').show();
      $('#box2').addClass('animated slideInUp');
      $('#box3').show();
      $('#box3').addClass('animated slideInUp');
      $('#topbox1').show();
      $('#topbox1').addClass('animated slideInDown');
      $('#topbox2').show();
      $('#topbox2').addClass('animated slideInDown');
      $('#topbox3').show();
      $('#topbox3').addClass('animated slideInDown');
    }, 300);

    setTimeout(function(){
      $('#titletron').show();
      $('#titletron').addClass('animated slideInLeft');
      $('#subtron').show();
      $('#subtron').addClass('animated slideInRight');
      $('#subsubtron').show();
      $('#subsubtron').addClass('animated slideInLeft');
      $('#green').show();
      $('#green').addClass('animated slideInDown');
    }, 300);

    $scope.init = function() {
      setTimeout(function(){
        $scope.dishlist = Dishes;
        Dishes.forEach(function(item){
          dataHuman.push(item.score);
          dataData.push(item.score_data);
        });

      }, 200);



      setTimeout(function(){
        for(var i = 0; i < 100; i++){
          ingHum[i] = Ingredients[i].score_human;
          ingDig[i] = Ingredients[i].score_data;
        }
      }, 500);

    };

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


 setTimeout(function(){
   $('#ing_chart_container').highcharts({
           chart: {
             type: 'column',
           },
           title: {
               text: 'Point For Ingredienser'
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
               data: ingHum
           }, {
               name: 'Maskine',
               data: ingDig
           }]
       });
  }, 600);


// FULLPAGE ANIMATION TRIGGERS


    // $(document).ready(function() {
    //     $('#fullpage').fullpage({
    //       easingcss3: 'ease',
    //       onLeave: function(index, nextIndex, direction){
    //         console.log('nextIndex ' + nextIndex);
    //         console.log('direction ' + direction);
    //         console.log('index ' + index);
    //         switch (nextIndex) {
    //           case 1 :
    //             console.log("FØRSTE SIDE MED BOKSE");
    //             // $('#top_boxes').addClass('animated slideOutRight');
    //             // $('#bottom_boxes').addClass('animated slideOutLeft');
    //             break;
    //           case 2 :
    //             // $('#chart_container').addClass('animated fadeOut');
    //             // $('#chart_container').toggle();
    //             console.log("DIAGRAM SIDEN");
    //             break;
    //           case 3 :
    //             console.log('nextIndex is ' + index);
    //             break;
    //           case 4 :
    //             console.log('nextIndex is ' + index);
    //             break;
    //         }
    //       },
    //       afterLoad: function(anchorLink, index){
    //
    //         console.log('after loading section');
    //         console.log(index);
    //         switch (index) {
    //           case 1 :
    //             // $('#top_boxes').show();
    //             // $('#top_boxes').addClass('animated slideInLeft');
    //             // $('#bottom_boxes').show();
    //             // $('#bottom_boxes').addClass('animated slideInRight');
    //             console.log('index is ' + index);
    //             break;
    //           case 2 :
    //             $('#chart_container').show();
    //             $('#chart_container').addClass('animated slideInUp');
    //             console.log('index is ' + index);
    //             break;
    //           case 3 :
    //             console.log('index is ' + index);
    //             break;
    //           case 4 :
    //             console.log('index is ' + index);
    //             break;
    //         }
    //       },
    //
    //     });
    // });

}]);
