angular.module('angularPassportApp')
.controller('ReaderController', ['$scope', '$http',
	function sendUserInfo ($scope, $http) {

		// var id = $rootScope.currentUser._id;
		$http.get('api/users/' + $scope.currentUser._id).success(function(response) {
			console.log('scope current user', $scope.currentUser._id);
			console.log(response);
		 	$scope.userInfo=response;
		});
	}
]);
