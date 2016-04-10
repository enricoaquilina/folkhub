angular.module('app').controller('mvUserHubsCtrl', function($scope, $routeParams, $location, HubRsc, Hub, Notifier){
  // if(Identity.currentuser && $routeParams.username  === Identity.currentuser.username){
  // }
  Hub.isHubOwnerAuthenticated($routeParams.username)
  .then(function(){
    $scope.myhubs = HubRsc.query({ _id: $routeParams.username})
  }, function(reason){
    Notifier.error(reason);
    $location.path('/');
  })
})
