angular.module('app').controller('mvHubUpdateCtrl', function($scope, $routeParams, $location, Auth, Identity, HubRsc, Notifier){

  $scope.update = function() {
    var hubdata = {
      hubname: $scope.hubname,
      description: $scope.description,
      picture: $scope.picture,
      keywords: $scope.keywords,
    }
    Hub.update(hubdata)
    .then(function(){
      Notifier.success('You have updated '+hubdata.hubname);
      $location.path('/'+hubdata.hubname+'/update');
    }, function(reason){
      notifier.error(reason);
    })
  }
})
