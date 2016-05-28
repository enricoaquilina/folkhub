angular.module('app').controller('mvMainCtrl', function($scope){
  $scope.myVar = "Hello from Angular!";

  var host = location.origin
              .replace(/^http/, 'ws');

  var ws = new WebSocket(host);
  ws.onopen = function(event) {
    console.log("Connection established");

  };
  $scope.send = function(){
    var msg = $scope.usermessage;
    ws.send(msg);
  }
  ws.onmessage = function(event){
    // ws.send(event.data);
    console.log(event.data);
  };
  ws.onerror = function(event) {
    console.log(event.data);
  };


  // $scope.$on('$locationChangeStart', function(event){
  //   //disconnect here
  //   console.log('disconnect');
  // })
});
