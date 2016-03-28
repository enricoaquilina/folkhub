angular.module('app').factory('Hub', function($q, $http, HubRsc){
  return {
    createHub: function(newHubData){
      var dfd = $q.defer();
      var newHub = new HubRsc(newHubData);
      newHub.$save().then(function(){
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }
  }
});
