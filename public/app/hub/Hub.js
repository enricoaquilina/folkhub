angular.module('app').factory('Hub', function($q, $routeParams, $http, HubRsc, Identity){
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
        var hub = new HubRsc();
        angular.extend(hub, hubData);

        Identity.currenthub = hub;
        console.log(Identity.currenthub);
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    delete: function(hubData){
      var dfd = $q.defer();

      // $http.post('/deletehub', { hub : hubData })
      //   .then(function(){
      //   Identity.currenthub = undefined;
      //   dfd.resolve(true);
      // });
      // return dfd.promise;

      var clone = angular.copy(Identity.currenthub);
      angular.extend(clone, hubData);

      clone.$delete().then(function(){
        Identity.currenthub = undefined;
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
          var hub = new HubRsc(response.data.hub);
          Identity.currenthub = hub;
          dfd.resolve(true);
        }else{
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    isHubOwnerAuthenticated: function(hubowner){
      var dfd = $q.defer();
      if(Identity.currentuser &&
        Identity.currentuser.username === hubowner){
        dfd.resolve();
      }else{
        dfd.reject('Please use the site\'s links to view a users\' hubs!');
      }
      return dfd.promise;
    }
  }
});
