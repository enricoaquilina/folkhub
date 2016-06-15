angular.module('app').factory('Auth', function($q, $http, Identity, UserRsc, Info){
  return {
    authenticate: function(username, password, clientID){
      var dfd = $q.defer();
      $http.post('/login', { username: username, password: password, clientID:clientID})
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
    isUserAuthenticated: function(){
      if(Identity.isAuthenticated()){
        return true;
      }else{
        //this will notify us when listening to the route change
        return $q.reject('unauthorized');
      }
    },
    update: function(userData){
      var dfd = $q.defer();

      //we create a copy of the currentuser in case
      //the update fails
      var clone = angular.copy(Identity.currentuser);
      angular.extend(clone, userData);

      clone.$update().then(function(){
        Identity.currentuser = clone;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    delete: function(userData){
      var dfd = $q.defer();
      UserRsc.delete({id: userData}, function(user){
          dfd.resolve();
        },function(){
          dfd.reject('Unable to delete user');
        });

      return dfd.promise;
    },
    adminUpdate: function(userData){
      var dfd = $q.defer();

      var clone = angular.copy(Info.currentuser);
      angular.extend(clone, userData);

      clone.$update().then(function(){
        Info.currentuser = clone;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    signUp: function(userData){
      var dfd = $q.defer();
      var newUser = new UserRsc(userData);
      newUser.$save().then(function(){
        // Identity.currentuser = newUser;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    getUserDetails: function(username){
      var dfd = $q.defer();
      $http.post('/getUserDetails', {username: username})
      .then(function(response){
        if(response.data.success){
          var user = new UserRsc(response.data.user);
          Info.currentuser = user;
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      })
      return dfd.promise;
    }
  }
});
