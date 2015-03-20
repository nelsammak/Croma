var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http) {

		$http.get('/books2').success(function(response) {
			console.log("I received the DATA");
			/*for(var i = 0; i < response.length; i++)
				$scope["show" + response[i].id] = false;*/
		 	$scope.books2=response;
		});

	}
]);