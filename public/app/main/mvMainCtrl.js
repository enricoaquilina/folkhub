angular.module('app').controller('mvMainCtrl', function($scope){
  $scope.myVar = "Hello from Angular!";


  var host = location.origin
              .replace(/^http/, 'ws');
  $scope.users = ['bob', 'joe', 'luke'];
  $scope.hubmessages = [];

  var ws = new WebSocket(host);

  ws.onopen = function(event) {
    console.log("Connection established");
  };

  $scope.send = function(message){
    if(message != null && message != ''){
      ws.send(message);
    }
    $scope.message = "";
  }
  ws.onmessage = function(event){
    $scope.$apply(function(){
      $scope.hubmessages.push(event.data);
    })
  };

  ws.onerror = function(event) {
    console.log(event);
  };
  // $scope.$on('$locationChangeStart', function(event){
  //   //disconnect here
  //   console.log('disconnect');
  // })
});
