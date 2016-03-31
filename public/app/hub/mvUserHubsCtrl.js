angular.module('app').controller('mvUserHubsCtrl', function($scope, $routeParams, HubRsc, Identity){
  $scope.myhubs = HubRsc.query({ _id: $routeParams.username})
})
