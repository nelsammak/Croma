'use strict';

//the controller take the edited info from the user and send it to the backend
angular.module('angularPassportApp')
  .controller('EditCtrl', function ($scope) {
   
    $scope.edit = function(form) {

      
      var info= {
        
        firstName:$scope.user.firstName,
        lastName: $scope.user.lastName,
        age:$scope.user.age,
        address:$scope.user.address,

      }
      $http.post('api/users/' + $scope.currentUser._id, data)
      .success(function (data, status, headers) {
        console.log(data);
        });

      }
