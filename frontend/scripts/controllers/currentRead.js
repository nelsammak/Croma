'use strict';

angular.module('angularPassportApp')
.controller('CurrentReadCtrl', 
	function getCurrentBooks ($scope, $http){
		$http.get('/api/' + $scope.currentUser._id + '/currentlyReading')
		.success(function(response){
			$scope.currentBooks = response;
		});	

	});