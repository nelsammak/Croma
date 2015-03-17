'use strict';

angular.module('Croma')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Users', {
        templateUrl: 'views/User/Users.html',
        controller: 'UserController',
        resolve:{
          resolvedUser: ['User', function (User) {
            return User.query();
          }]
        }
      })
    }]);
