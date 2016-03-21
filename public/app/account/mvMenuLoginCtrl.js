angular.module('app').controller('mvMenuLoginCtrl', function($scope, $http,$location, mvNotifier, mvIdentity, mvAuth){
  $scope.identity = mvIdentity;
  $scope.authenticate = function(username, password){
    mvAuth.authenticate(username, password)
    .then(function(success){
      if(success){
        mvNotifier.success('You have successfully logged in!');
      }else{
        mvNotifier.error('Incorrect username/ password combination!');
      }
    });
  }
  $scope.signOut = function(){
    mvAuth.logoutUser().then(function(success){
      if(success){
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";
        mvNotifier.success('You have successfully logged out!');
        $location.path('/');
      }
    })
  }
});
