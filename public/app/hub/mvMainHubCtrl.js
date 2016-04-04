angular.module('app').controller('mvMainHubCtrl', function($scope, $routeParams, HubRsc, Identity, Notifier, Hub){
  Hub.getHubDetails($routeParams.hubname)
  .then(function(){
    if(Identity.currenthub){
      $scope.hubname = Identity.currenthub.hubname;
      $scope.description = Identity.currenthub.description;
      $scope.helpers = Identity.currenthub.helpers;
    }
  }, function(reason){
    Notifier.error(reason);
  })

  $scope.updateHub = function(){
    var newHubData = {
      hubname: $scope.hubname,
      description: $scope.description,
      helpers: $scope.helpers,
    }
    Hub.update(newHubData)
    .then(function(){
      Notifier.success('The details about your hub have been saved!');
      $location.path('/'+Identity.currentuser.username+'/hubs');
    }, function(reason){
      Notifier.error(reason);
    })
  }
})
