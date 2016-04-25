angular.module('app').controller('mvMainCtrl', function($scope){
  $scope.myVar = "Hello from Angular!";

  var ws = new WebSocket('ws://localhost:5001');

  $scope.$on('$locationChangeStart', function(event){
    //disconnect here
    console.log('disconnect');
  })
});
