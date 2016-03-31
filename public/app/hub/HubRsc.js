angular.module('app').factory('HubRsc', function($resource){
  var HubResource = $resource('/api/hubs/:_id', {_id: "@id"});

  return HubResource;
})
