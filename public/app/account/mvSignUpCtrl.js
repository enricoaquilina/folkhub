angular.module('app').controller('mvSignUpCtrl', function($scope, $location, Notifier, Auth){
  $scope.signUp = function() {
    var userData = {
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    }
    Auth.signUp(userData)
      .then(function(){
        Notifier.success('You have created a new account!');
        $location.path('/');
      }, function(reason){
        Notifier.error(reason);
      })
  }
})
