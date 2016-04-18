angular.module('app').controller('mvHubUpdateCtrl', function($scope, $routeParams, $location, Auth, Identity, HubRsc, Notifier){

  $scope.update = function() {
    console.log('testing');
    return false;
    var hubdata = {
      hubname: $scope.hubname,
      description: $scope.description,
      picture: $scope.picture,
      helpers: $scope.helpers,
    }

    Hub.update(hubdata)
    .then(function(){
      Notifier.success('You have updated '+hubdata.hubname);
      $location.path('/admin/hubs');
    }, function(reason){
      notifier.error(reason);
    })
  }
})
