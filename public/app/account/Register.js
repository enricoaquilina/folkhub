angular.module('app').factory('Register', function($q, $http){
    return {
      signUp: function(username, email, password){
        var dfd = $q.defer();
        $http.post('/register',
        {
          username: username,
          email: email,
          password: password
        }).then(function(response){
          if(response){
            dfd.resolve(true);
          }else{
            dfd.resolve(false);
          }
        });
        return dfd.promise;
      }
    }
  })
