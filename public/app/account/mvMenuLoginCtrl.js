angular.module('app').controller('mvMenuLoginCtrl', function($scope, $http){
  $scope.authenticate = function(username, password){
    $http.post('/login', { username: username, password: password })
    .then(function(response){
      if(response.data.success){
        //this means that user was found and therefore a user object is present
        //therefore create session
        console.log('logged in!');
      }else{
        console.log('failed to log in!');
      }
    });
  }
});
