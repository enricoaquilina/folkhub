angular.module('app').controller('mvMainCtrl', function($scope){

  var host = location.origin
              .replace(/^http/, 'ws');

  $scope.users = ['bob', 'joe', 'luke'];
  $scope.hubmessages = [];

  var ws = new WebSocket(host);

  ws.onopen = function(event) {
    ws.send('Now talking in main hub!');
  };

  $scope.send = function(message){
    if(message != null && message != ''){
      ws.send(message);
    }
    $scope.message = '';
  }
  ws.onmessage = function(event){
    $scope.$apply(function(){
      $scope.hubmessages.push(event.data);
    })
  };

  ws.onerror = function(event) {
    sys.debug(event);
    console.log(event);
  };
  // $scope.$on('$locationChangeStart', function(event){
  //   //disconnect here
  //   console.log('disconnect');
  // })
});
