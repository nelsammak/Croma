'use strict';

angular.module('angularPassportApp')
.controller('ShelfCtrl', ['$scope', '$http',
	function getShelves ($scope, $http){

		$http.get('/api/users/' + $scope.currentUser._id + '/currentlyReading').success(function(response){
			$scope.currentBooks = response;
		});
		$http.get('/api/users/' + $scope.currentUser._id + '/toBeReadBooks').success(function(response){
			$scope.toBeRead = response;
		});
		$http.get('/api/users/' + $scope.currentUser._id + '/readBooks').success(function(response){
			$scope.Read = response;
		});

	}]
);