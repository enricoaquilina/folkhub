angular.module('app').controller('mvMainCtrl', function($scope, $routeParams,$location, Identity, Hub, HubUser, Notifier){
  $scope.identity = Identity;
  var host = location.origin
              .replace(/^http/, 'ws');

  $scope.users = ['bob', 'joe', 'luke'];
  $scope.hubmessages = [];

  var ws = new WebSocket(host);
  Hub.getHubDetails($routeParams.hubname)
  .then(function(success){
    if(success){
      var d = new Date(Identity.currenthub.datecreated);
      $scope.created = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
      $scope.creator = Identity.currenthub.creator;
      $scope.description = Identity.currenthub.description;
      $scope.helpers = Identity.currenthub.helpers;
      $scope.hubname = Identity.currenthub.hubname;
    }else{
      $location.path('/');
    }
  });
  $scope.send = function(message){
    var hubMsg = {
      username: Identity.currentuser.username,
      message: message,
      time: new Date()
    };
    Hub.getHubDetails($routeParams.hubname)
    .then(function(success){
      if($routeParams.hubname && message){
        hubMsg.hubname = 'hub:'+Identity.currenthub.hubname;
      }
      else if(!$routeParams.hubname){
        hubMsg.hubname = 'hub:main';
      }
      ws.send(JSON.stringify(hubMsg));
      $scope.message = '';
    });
  }
  ws.onmessage = function(event){
    var msgData = JSON.parse(event.data);
    if(msgData.clientID){
      Identity.clientID = msgData.clientID;
      return false;
    }
    $scope.$apply(function(){
      $scope.hubmessages.push(msgData.username+': '+msgData.message);
    })
  };

  ws.onerror = function(event) {
    // sys.debug(event);
    console.log(event);
  };
  $scope.subscribe = function(){
    var hubuser={};
    hubuser.hubname = 'hub:'+Identity.currenthub.hubname;

    HubUser.create(hubuser)
      .then(function(){
        Notifier.success('You have subscribed to the hub!');
        $location.path('/');
      }, function(reason){
        Notifier.error(reason);
      })
  }
});
