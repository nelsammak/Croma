'use strict';

angular.module('angularPassportApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'ui.router',
  'flow'


])
//choosing a specific partial HTML and a controller for any route

  .config(function ($routeProvider, $locationProvider,flowFactoryProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/books', {
        templateUrl: 'partials/books.html',
        controller: 'BooksCtrl'

      })
      .when('/bookclubs', {
        templateUrl: 'partials/bookclubs.html',
        controller: 'BookClubsCtrl'

      })
      .when('/newarrivals', {
        templateUrl: 'partials/books.html',
        controller: 'NewArrivalsCtrl'
      })
      .when('/genre', {
        templateUrl: 'partials/genre.html',
        controller: 'GenreCtrl'
      })
      .when('/genre/:genre', {
        templateUrl: 'partials/books.html',
        controller: 'GenreDisplayCtrl'
      })

      .when('/books/:id', {
        templateUrl: 'partials/book.html',
        controller: 'BookCtrl'
      })
      
      .when('/profile', {
        templateUrl: 'partials/userprofile.html',
        controller: 'ProfileController'
      })
      .when('/createbookclub', {
        templateUrl: 'partials/createbookclub.html'
        //controller: 'ExampleController'
      })
      .when('/thebook', {

        templateUrl: 'partials/index.html',
       // controller: 'ReaderController'

      })
      .when('/dashboard', {

        templateUrl: 'partials/dashboard.html',
       // controller: 'ReaderController'

      })
      .when('/shelves',{
        templateUrl: 'partials/myShelf.html',
        controller: 'ShelfCtrl'
        
      })
      .when('/searchResults', { 
        templateUrl: 'partials/searchResult.html',
        controller: 'searchResultCtrl'
      })


      .otherwise({
        redirectTo: '/'
      });

      


    flowFactoryProvider.defaults = {
    target: '/api/admin/addBook',
    testChunks: false,
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 5
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });


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



