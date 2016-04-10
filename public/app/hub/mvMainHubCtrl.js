angular.module('app').controller('mvMainHubCtrl', function($scope, $routeParams, $location, HubRsc, Identity, Notifier, Hub){
  Hub.getHubDetails($routeParams.hubname)
  .then(function(success){
    if(success){
      $scope.hubname = Identity.currenthub.hubname;
      $scope.description = Identity.currenthub.description;
      $scope.creator = Identity.currenthub.creator;
      $scope.helpers = Identity.currenthub.helpers;
    }else{
      Notifier.error('Are you sure you\'re the owner of the hub?');
      $location.path('/');
    }
  });

  $scope.updateHub = function(){
    var newHubData = {
      hubname: $scope.hubname,
      description: $scope.description,
      helpers: $scope.helpers,
    }
    Hub.update(newHubData)
    .then(function(){
      Notifier.success('The details about your hub have been saved!');
      $location.path('/'+Identity.currenthub.hubname+'/update');
    }, function(reason){
      Notifier.error(reason);
    })
  }
  $scope.deleteHub = function(){
    Hub.delete(Identity.currenthub)
    .then(function(success){
      if(success){
        $scope.hubname = "";
        $scope.description = "";
        $scope.helpers = "";

        Notifier.success('You have successfully deleted the hub!');
        $location.path('/' + Identity.currentuser.username + '/hubs');
      }
    })
  }
})
