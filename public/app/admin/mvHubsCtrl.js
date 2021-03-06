angular.module('app').controller('mvHubsCtrl', function($scope, $routeParams, $location, HubRsc, Hub, Identity, Notifier){
  $scope.hubs = HubRsc.query();

  Hub.getHubDetails($routeParams.hubname)
  .then(function(success){
    if(success){
      var d = new Date(Identity.currenthub.datecreated);
      $scope.created = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear();
      $scope.creator = Identity.currenthub.creator;
      $scope.description = Identity.currenthub.description;
      $scope.helpers = Identity.currenthub.helpers;
      $scope.hubname = Identity.currenthub.hubname;
      $scope._id = Identity.currenthub._id;
    }
  });

  $scope.update = function(){
    var hubdata = {
      _id: $scope._id,
      hubname: $scope.hubname,
      description: $scope.description,
      picture: $scope.picture,
      helpers: $scope.helpers,
    }
    Hub.update(hubdata)
    .then(function(){
      Notifier.success('You have updated the hub successfully');
      $location.path('/'+hubdata.hubname+'/update-hub');
    }, function(reason){
      Notifier.error(reason);
    })
  }
});
