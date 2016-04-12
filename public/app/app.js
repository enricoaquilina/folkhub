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
    },
    hubowner: {
      auth: function(Hub){
        return Hub.isUserHubOwner();
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
    .when('/admin/hubs',
      {
        templateUrl: '/partials/admin/hub-list',
        controller: 'mvHubsCtrl',
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
    .when('/hubs',
      {
        templateUrl: '/partials/hub/all-hubs',
        controller: 'mvHubsCtrl'
      }
    )
    // .when('/:hubname',
    //   {
    //     templateUrl: '/partials/hub/hub',
    //     controller: 'mvMainHubCtrl'
    //   }
    // )
    .when('/:username/hubs',
      {
        templateUrl: '/partials/hub/user-hubs',
        controller: 'mvUserHubsCtrl'
      }
    )
    .when('/:hubname/details',
      {
        templateUrl: '/partials/hub/hub-details',
        controller: 'mvMainHubCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/:hubname/update',
      {
        templateUrl: '/partials/hub/hub-update',
        controller: 'mvMainHubCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/:hubname/delete',
      {
        templateUrl: '/partials/hub/hub-delete',
        controller: 'mvMainHubCtrl',
        resolve: routeRoleChecks.signedin
      }
    )
    .when('/profile',
      {
        templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.signedin
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
