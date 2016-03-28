angular.module('app').controller('mvUsersCtrl', function($scope, UserRsc){
  //assign scope to list of users
  $scope.users = UserRsc.query();
});
