angular.module('app').controller('mvMainHubCtrl', function($scope, $routeParams, $location, HubRsc, Identity, Notifier, Hub){
  $scope.identity = Identity;
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
    HubRsc.delete({_id: Identity.currenthub._id});
    // Hub.delete(Identity.currenthub)
    // .then(function(){
    //     $scope.hubname = "";
    //     $scope.description = "";
    //     $scope.helpers = "";
    //
    //     Notifier.success('You have successfully deleted the hub!');
    //     $location.path('/' + Identity.currentuser.username + '/hubs');
    // })
  }
})
