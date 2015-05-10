'use strict';

angular.module('croma')
  .controller('MainCtrl', function ($scope,$routeParams, $location,$window) {
   $scope.loginGo = function() {

    $location.path ('/login');

   };
   $scope.signupGo = function() {

    $location.path ('/signup');

   };
  });
