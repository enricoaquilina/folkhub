angular.module('app').controller('mvSignUpCtrl', function($scope, $location, mvNotifier, mvAuth){
  $scope.signUp = function() {
    var userData = {
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    }
    mvAuth.signUp(userData)
      .then(function(){
        mvNotifier.success('You have created a new account!');
        $location.path('/');
      }, function(reason){
        mvNotifier.error(reason);
      })
  }
})
