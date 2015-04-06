'use strict';

angular.module('angularPassportApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'ui.router'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/partials/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/books', {
        templateUrl: 'views/partials/books.html',
        controller: 'AppCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/partials/userprofile.html',
        controller: 'ProfileController'
      })
      .when('/thebook', {
        templateUrl: 'views/partials/index.html',
        controller: 'ReaderController'
      })
      .otherwise({
        redirectTo: '/'
      });

      
    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $location, Auth) {
 
 $rootScope.contentsPath = '';
    
    $rootScope.metadata = {bookTitle: 'TDO'};

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });