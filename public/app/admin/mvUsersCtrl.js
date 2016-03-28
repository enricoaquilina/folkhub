angular.module('app').controller('mvUsersCtrl', function($scope, mvUser){
  //assign scope to list of users
  $scope.users = mvUser.query();
});
