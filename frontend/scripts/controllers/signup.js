'use strict';

angular.module('angularPassportApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.gender='male';


    $scope.register = function(form) {

      if($scope.user.admin != true){
        $scope.user.admin = false;
      };
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
            Auth.login('password', $scope.user, function() {
              $location.path('/');
            });

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