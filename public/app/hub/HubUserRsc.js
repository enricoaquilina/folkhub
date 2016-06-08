angular.module('app').factory('HubUserRsc', function($resource){
  var HubUserResource = $resource('/api/hubusers/:id', {_id: "@id"}, {
    update: {
      method: 'PUT', isArray: false
    }
  });

  return HubUserResource;
});
