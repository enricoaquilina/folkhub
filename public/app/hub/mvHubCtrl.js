angular.module('app').controller('mvHubCtrl', function($scope, $location, Notifier, Hub, HubRsc){

  $scope.createHub = function() {
    var hubData = {
      hubname: $scope.name,
      description: $scope.description,
      picture: $scope.picture,
      helpers: $scope.helpers
    }
    Hub.createHub(hubData)
      .then(function(){
        Notifier.success('You have created a new hub!');
        $location.path('/');
      }, function(reason){
        Notifier.error(reason);
      });
  }
})
