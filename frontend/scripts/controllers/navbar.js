'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {
    $scope.menu = [
    ];

    $scope.authMenu = [{
      "title": "Profile",
      "link": "profile" 
    }, {
      "title": "All Books",
      "link": "books"
    }, {
      "title": "New arrivals",
      "link": "books/new_arrivals"
    }, {
      "title": "Browse by Genre",
      "link": "books/genre"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
