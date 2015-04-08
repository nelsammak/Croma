'use strict';

angular.module('angularPassportApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.gender='male';
    $scope.register = function(form) {
      Auth.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password,
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          age: $scope.user.age,
          address: $scope.user.address,
          gender: $scope.gender,
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