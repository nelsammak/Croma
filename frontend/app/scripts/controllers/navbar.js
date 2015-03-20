'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {
    $scope.menu = [
    ];

    $scope.authMenu = [{
      "title": "Create New Blog",
      "link": "blogs/create"
    },
    {
      "title": "Profile",
      "link": "blogs"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
