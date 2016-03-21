angular.module('app').factory('mvAuth', function($q, $http, mvIdentity, mvUser){
  return {
    authenticate: function(username, password){
      var dfd = $q.defer();
      $http.post('/login', { username: username, password: password })
      .then(function(response){
        if(response.data.success){
          var user = new mvUser();
          angular.extend(user, response.data.user);
          mvIdentity.currentUser = user;
          //this means that user was found and therefore a user object is present
          //therefore create session
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser: function(){
      var dfd = $q.defer();
      //we give this a body, otherwise angular turns it into a GET
      $http.post('/logout', {logout:true}).then(function(){
        mvIdentity.currentUser = undefined;
        dfd.resolve(true);
      });
      return dfd.promise;
    }
  }
});
