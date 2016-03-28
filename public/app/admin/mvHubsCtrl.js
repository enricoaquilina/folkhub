angular.module('app').controller('mvHubsCtrl', function($scope, HubRsc){
  $scope.hubs = HubRsc.query();
});
