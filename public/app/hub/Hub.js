angular.module('app').factory('Hub', function($q, $routeParams, Auth, $http, HubRsc, Identity){
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
      console.log('here');
      console.log(clone);
      return false;
      clone.$update().then(function(){
        var hub = new HubRsc();
        angular.extend(hub, hubData);

        // Identity.currenthub = hub;
        dfd.resolve();
      }, function(response){
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    delete: function(hubData){
      var dfd = $q.defer();

      var clone = angular.copy(Identity.currenthub);
      angular.extend(clone, hubData);

      // console.log(Identity.currenthub);
      // return false;

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
          ((response.data.hub.creator === Identity.currentuser.username) ||
          (Identity.isAuthorized('admin')))){
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
