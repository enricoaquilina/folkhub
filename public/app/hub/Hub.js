angular.module('app').factory('Hub', function($q, $http, HubRsc, Identity){
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
    },
    update: function(hubData){
      var dfd = $q.defer();

      var clone = angular.copy(Identity.currenthub);
      angular.extend(clone, hubData);

      clone.$update().then(function(){
        Identity.currenthub = clone;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    getHubDetails: function(hubname){
      var dfd = $q.defer();
      $http.post('/getHubDetails', { hubname: hubname})
      .then(function(response){
        if(response.data.success &&
           response.data.hub.creator === Identity.currentuser.username){
          var hub = new HubRsc();
          angular.extend(hub, response.data.hub);
          console.log(response.data.hub);
          Identity.currenthub = hub;
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }
  }
});
