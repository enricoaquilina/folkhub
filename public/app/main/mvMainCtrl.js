angular.module('app').controller('mvMainCtrl', function($scope){
  $scope.myVar = "Hello from Angular!";

  // var ws = new WebSocket('ws://localhost:5001');
  // ws.onmessage = function(event){
  //   // ws.send(event.data);
  //   console.log(event.data);
  // };
  // ws.onerror = function(event) {
  //   console.log(event.data);
  // };
  // ws.onopen = function(event) {
  //   console.log("Connection established");
  // };
  // $scope.send = function(){
  //   var msg = $scope.usermessage;
  //   ws.send(msg);
  // }
  // $scope.$on('$locationChangeStart', function(event){
  //   //disconnect here
  //   console.log('disconnect');
  // })
});
