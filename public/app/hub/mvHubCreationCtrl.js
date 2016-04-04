angular.module('app').controller('mvHubCreationCtrl', function($scope, $location, $routeParams, Identity, Notifier, Hub, HubRsc){

  $scope.createHub = function() {
    var hubData = {
      hubname: $scope.name,
      description: $scope.description,
      picture: $scope.picture,
      helpers: $scope.helpers,
      creator: Identity.currentuser.username
    }
    Hub.createHub(hubData)
      .then(function(){
        Notifier.success('You have created a new hub!');
        $location.path('/'+Identity.currentuser.username+'/hubs');
      }, function(reason){
        Notifier.error(reason);
      });
  }
})
