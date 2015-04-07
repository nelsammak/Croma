'use strict';

angular.module('angularPassportApp')
.controller('CurrentReadCtrl', ['$scope', '$http',
	function getCurrentBooks ($scope, $http){
		$http.get('/api/' + $scope.currentUser._id + '/currentlyReading').success(function(response){
			$scope.currentBooks = response;
		});
	});