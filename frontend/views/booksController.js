var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/books2').success(function(response) {
		console.log("I received the DATA");
	 	$scope.books2=response;
	});
}]);