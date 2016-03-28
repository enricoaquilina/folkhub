angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
  var routeRoleChecks = {
    admin: {
      auth: function(Auth){
        return Auth.authorizeUserForRoute('admin')
      }
    }
  }
  $locationProvider.html5Mode(true);
  //all meh routes in here
  $routeProvider
    .when('/',
      {
        templateUrl: '/partials/main/main', controller: 'mvMainCtrl'
      }
    )
    .when('/admin/users',
      {
        templateUrl: '/partials/admin/users',
        controller: 'mvUsersCtrl',
        resolve: routeRoleChecks.admin
      }
    )
    .when('/create',
      {
        templateUrl: '/partials/hub/create',
        controller: 'mvHubCtrl'
      }
    )
    .when('/signup',
      {
        templateUrl: '/partials/account/register',
        controller: 'mvSignUpCtrl'
      }
    )
    .when('/admin/hubs',
      {
        templateUrl: '/partials/hub/hubs',
        controller: 'mvHubsCtrl',
        resolve: routeRoleChecks.admin
      }
    );
});

angular.module('app').run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
    if(rejection === 'unauthorized'){
      $location.path('/');
    }
  })
});
