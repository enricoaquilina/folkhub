angular.module('app').factory('Identity', function($window, UserRsc){
  var currentuser;
  if($window.bootstrappedUserObject){
    currentuser = new UserRsc();
    angular.extend(currentuser, $window.bootstrappedUserObject);
  }
  return{
    currentuser: currentuser,
    isAuthenticated: function() {
      return this.currentuser;
    },
    isAuthorized: function(role) {
      return this.currentuser && this.currentuser.roles.indexOf(role) > -1;
    },
  }
});
