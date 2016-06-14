angular.module('app').controller('mvMainHubCtrl', function($scope, $routeParams, $location, Identity, Notifier, Hub, HubUser){
  $scope.identity = Identity;

  $scope.updateHub = function(){
    var newHubData = {
      _id: Identity.currenthub._id,
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
    .then(function(){
        $scope.hubname = "";
        $scope.description = "";
        $scope.helpers = "";

        Notifier.success('You have successfully deleted the hub!');
        $location.path('/' + Identity.currentuser.username + '/hubs');
    })
  }

})
