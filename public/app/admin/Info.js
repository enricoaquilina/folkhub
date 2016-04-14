angular.module('app').factory('Info', function($window, UserRsc, HubRsc){
  var currentuser;
  var currenthub;

  if($window.bootstrappedUserObject){
    userinfo = new UserRsc();
    hubinfo = new HubRsc();
  }
  return{
    currentuser: currentuser,
    currenthub: currenthub
  }
});
