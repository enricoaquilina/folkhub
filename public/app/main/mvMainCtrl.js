angular.module('app').controller('mvMainCtrl', function($scope, $routeParams, Identity, Hub){
  $scope.identity = Identity;
  var host = location.origin
              .replace(/^http/, 'ws');

  $scope.users = ['bob', 'joe', 'luke'];
  $scope.hubmessages = [];

  var ws = new WebSocket(host);
  // ws.onopen = function(event) {
  //   console.log('Now talking in main hub!');
  // };

  $scope.send = function(message){
    Hub.getHubDetails($routeParams.hubname)
    .then(function(success){
      var hubMsg;
      if(success){
        if(message != null && message != ''){
          hubMsg = {
            username: Identity.currentuser.username,
            hubname: 'hub:'+Identity.currenthub.hubname,
            message: message,
            time: new Date()
          }
        }
        if($routeParams.hubname == undefined)
          hubMsg.hubname = 'hub:main'
      }
      ws.send(JSON.stringify(hubMsg));
      $scope.message = '';
    });
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
});
