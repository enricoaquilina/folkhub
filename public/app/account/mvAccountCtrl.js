angular.module('app')
.controller('mvAccountCtrl', function($scope, $http, $location, Notifier, Identity, Auth){
  $scope.identity = Identity;
  $scope.authenticate = function(username, password){
    Auth.authenticate(username, password)
    .then(function(success){
      if(success){
        Notifier.success('You have successfully logged in!');
        $location.path('/');
      }else{
        Notifier.error('Incorrect username/ password combination!');
      }
    });
  }
  $scope.signOut = function(){
    Auth.logoutUser().then(function(success){
      if(success){
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";
        Notifier.success('You have successfully logged out!');
        $location.path('/');
      }
    })
  }
  
});
