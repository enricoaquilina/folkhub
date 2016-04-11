angular.module('app').factory('Identity', function($window, UserRsc, HubRsc){
  var currentuser;
  var currenthub;

  if($window.bootstrappedUserObject){
    currentuser = new UserRsc();
    currenthub = new HubRsc();

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
