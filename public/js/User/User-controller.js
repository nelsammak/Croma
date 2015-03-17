'use strict';

angular.module('Croma')
  .controller('UserController', ['$scope', '$modal', 'resolvedUser', 'User',
    function ($scope, $modal, resolvedUser, User) {

      $scope.Users = resolvedUser;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.User = User.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        User.delete({id: id},
          function () {
            $scope.Users = User.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          User.update({id: id}, $scope.User,
            function () {
              $scope.Users = User.query();
              $scope.clear();
            });
        } else {
          User.save($scope.User,
            function () {
              $scope.Users = User.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.User = {
          
          "name": "",
          
          "password": "",
          
          "email": "",
          
          "address": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var UserSave = $modal.open({
          templateUrl: 'User-save.html',
          controller: 'UserSaveController',
          resolve: {
            User: function () {
              return $scope.User;
            }
          }
        });

        UserSave.result.then(function (entity) {
          $scope.User = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UserSaveController', ['$scope', '$modalInstance', 'User',
    function ($scope, $modalInstance, User) {
      $scope.User = User;

      

      $scope.ok = function () {
        $modalInstance.close($scope.User);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
