angular.module('app').controller('mvUserHubsCtrl', function($scope, $routeParams, HubRsc){
  $scope.myhubs = HubRsc.query({ _id: $routeParams.username})
})
