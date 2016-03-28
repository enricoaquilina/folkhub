angular.module('app').factory('Auth', function($q, $http, Identity, UserRsc){
  return {
    authenticate: function(username, password){
      var dfd = $q.defer();
      $http.post('/login', { username: username, password: password })
      .then(function(response){
        if(response.data.success){
          var user = new UserRsc();
          angular.extend(user, response.data.user);
          Identity.currentuser = user;
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
        Identity.currentuser = undefined;
        dfd.resolve(true);
      });
      return dfd.promise;
    },
    authorizeUserForRoute: function(role) {
      if(Identity.isAuthorized(role)){
        return true;
      }else{
        //this will notify us when listening to the route change
        return $q.reject('unauthorized');
      }
    },
    signUp: function(newUserData){
      var dfd = $q.defer();
      var newUser = new UserRsc(newUserData);
      newUser.$save().then(function(){
        Identity.currentUser = newUser;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
});
