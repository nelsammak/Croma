'use strict';

angular.module('croma')
.controller('AnnounceCtrl', 
	function ($scope, $http){
		$scope.message;
		$scope.type = 'notification';

		$scope.sendAlert= function() {
			console.log("ba3at");
			$http.post('api/alert', 
				{message: $scope.message, type: $scope.type})
			.success(function(bool) {
				swal("Sent Alert!", "Your users have been notified!", "success");
          
        });

		};

	});