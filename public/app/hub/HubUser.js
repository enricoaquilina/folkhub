angular.module('app').factory('HubUser', function($q, $routeParams, Auth, $http, HubUserRsc, Identity){
  return {
    create: function(hubuser){
      var dfd = $q.defer();
      var hubuserrsc = new HubUserRsc(hubuser);
      hubuserrsc.$save().then(function(){
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
});
