'use strict'
//sendUserInfo gets info of user using ID of current user
angular.module('angularPassportApp')
.controller('ProfileController', ['$scope', '$http',
  function sendUserInfo ($scope, $http) {
      $http.get('api/users/' + $scope.currentUser._id).success(function(response) { 
        console.log('scope current user', $scope.currentUser._id);
        console.log(response);
        $scope.userInfo=response;
      });
  },

]);

