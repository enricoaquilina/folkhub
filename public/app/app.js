angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
  var routeRoleChecks = {
    admin: {
      auth: function(Auth){
        return Auth.authorizeUserForRoute('admin')
      }
    },
    signedin: {
      auth: function(Auth){
        return Auth.isUserAuthenticated()
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
        templateUrl: '/partials/admin/user-list',
        controller: 'mvUsersCtrl',
        resolve: routeRoleChecks.admin
      }
    )
    .when('/create',
      {
        templateUrl: '/partials/hub/create',
        controller: 'mvHubCreationCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/signup',
      {
        templateUrl: '/partials/account/register',
        controller: 'mvSignUpCtrl'
      }
    )
    .when('/hubs/:username',
      {
        templateUrl: '/partials/hub/my-hubs',
        controller: 'mvUserHubsCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/hub/:hubname',
      {
        templateUrl: '/partials/hub/hub-update',
        controller: 'mvHubUpdateCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/profile',
      {
        templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/admin/hubs',
      {
        templateUrl: '/partials/admin/hub-list',
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
