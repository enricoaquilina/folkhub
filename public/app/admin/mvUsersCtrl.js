angular.module('app').controller('mvUsersCtrl', function($scope, $location, $routeParams, UserRsc, Auth, Info, Identity, Notifier){
  //assign scope to list of users
  $scope.users = UserRsc.query({_id: Identity.currentuser.username});

  Auth.getUserDetails($routeParams.username)
  .then(function(success){
    if(success){
      $scope._id = Info.currentuser._id;
      $scope.email = Info.currentuser.email;
      $scope.firstname = Info.currentuser.firstname;
      $scope.lastname = Info.currentuser.lastname;
      $scope.username = Info.currentuser.username;
    }
  });

  $scope.update = function(){
    var userData = {
      username: $scope.username,
      email: $scope.email,
      firstname: $scope.firstname,
      lastname: $scope.lastname,
    }
    Auth.adminUpdate(userData)
    .then(function(){
      Notifier.success('You have updated the user successfully');
      $location.path('/'+userData.username+'/update-user');
    }, function(reason){
      Notifier.error(reason);
    })
  }
  $scope.deleteUser = function(){
    Auth.delete($scope._id)
    .then(function(){
        $scope.hubname = "";
        $scope.description = "";
        $scope.helpers = "";

        Notifier.success('You have successfully deleted the user!');
        $location.path('/admin/users');
    })
  }
});
