angular.module('app').controller('mvMenuLoginCtrl', function($scope){
  $scope.authenticate = function(email, password){
    console.log('Authentication comes here');
  }
});
