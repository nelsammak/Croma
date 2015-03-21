'use strict';

angular.module('angularPassportApp')
.controller('AppCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {
		$http.get('/books2').success(function(response) {
			console.log("I received the DATA");
		 	$scope.books2=response;
		});
	}
]);
//Book Controller's job is to send the book collection in JSON format