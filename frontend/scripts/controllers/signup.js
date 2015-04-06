'use strict';

angular.module('angularPassportApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {

    $scope.register = function(form) {
      if($scope.user.admin != 'true'){
        $scope.user.admin = false;
      };
      console.log($scope.user.admin);
      Auth.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password,
          admin: $scope.user.admin
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
          }
        }
      );
    };
  });