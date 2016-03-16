angular.module('app').factory('mvAuth', function($q, $http, mvIdentity){
  return {
    authenticate: function(username, password){
      var dfd = $q.defer();
      $http.post('/login', { username: username, password: password })
      .then(function(response){
        if(response.data.success){
          mvIdentity.currentUser = response.data.user;
          //this means that user was found and therefore a user object is present
          //therefore create session
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }
  }
});
