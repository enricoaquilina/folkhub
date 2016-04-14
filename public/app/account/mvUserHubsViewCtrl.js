angular.module('app').controller('mvUserHubsViewCtrl', function($scope, $routeParams, HubRsc){
  $scope.userhubs = HubRsc.query({ _id: $routeParams.username})
})
