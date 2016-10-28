var APP = angular.module("APP");
APP.controller("indexController", ["$scope", "$http", "Dishes", "Data", "$q", "$cookies", function($scope, $http, Dishes, Data, $q, $cookies) {



  // $('#top_boxes').hide();
  // $('#bottom_boxes').hide();
  $('#titletron').hide();
  $('#box1').hide();
  $('#box2').hide();
  $('#box3').hide();
  $('#topbox1').hide();
  $('#topbox2').hide();
  $('#topbox3').hide();
  $('#chart_container').hide();

  var dataHuman = [];
  var dataData = [];
    var dishdata = [];
    var xData = [];
    var yData = [];
    $scope.labels = [];


    setTimeout(function(){
      // $('#top_boxes').show();
      // $('#top_boxes').addClass('animated slideInDown');
      $('#box1').fadeIn();
      $('#box1').addClass('animated slideInUp');
      $('#box2').fadeIn();
      $('#box2').addClass('animated slideInUp');
      $('#box3').fadeIn();
      $('#box3').addClass('animated slideInUp');
      $('#topbox1').fadeIn();
      $('#topbox1').addClass('animated slideInDown');
      $('#topbox2').fadeIn();
      $('#topbox2').addClass('animated slideInDown');
      $('#topbox3').fadeIn();
      $('#topbox3').addClass('animated slideInDown');
    }, 300);

    setTimeout(function(){
      $('#titletron').fadeIn();
      $('#titletron').addClass('animated slideInDown');
    }, 300);

    $scope.init = function() {
      setTimeout(function(){
        $scope.dishlist = Dishes;
        Dishes.forEach(function(item){
          dataHuman.push(item.score);
          dataData.push(item.score_data);
        });

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


// FULLPAGE ANIMATION TRIGGERS


    $(document).ready(function() {
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

        });
    });

}]);
