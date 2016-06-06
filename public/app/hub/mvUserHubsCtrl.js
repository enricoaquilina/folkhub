angular.module('app').controller('mvUserHubsCtrl', function($scope, $routeParams, $location, HubRsc, Hub, Notifier){
  var username = $routeParams.username;
  console.log(username);
  return false;
  Hub.isHubOwnerAuthenticated(username)
  .then(function(){
    $scope.myhubs = HubRsc.query({ _id: username})
  }, function(reason){
    Notifier.error(reason);
    $location.path('/');
  })
})
