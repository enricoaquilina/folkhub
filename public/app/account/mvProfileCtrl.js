angular.module('app').controller('mvProfileCtrl', function($scope, $location, Auth, Identity, Notifier){
  $scope.email = Identity.currentuser.email;
  $scope.username = Identity.currentuser.username;
  $scope.firstname = Identity.currentuser.firstname;
  $scope.lastname = Identity.currentuser.lastname;

  $scope.update = function() {
    var userData = {
      username: $scope.username,
      email: $scope.email,
      firstname: $scope.firstname,
      lastname: $scope.lastname,
    }
    if($scope.password && $scope.password.length > 0){
      userData.password = $scope.password;
    }
    Auth.update(userData)
    .then(function(){
      Notifier.success('You have updated your account!');
      $location.path('/profile');
    }, function(reason){
      Notifier.error(reason);
    })
  }
})
