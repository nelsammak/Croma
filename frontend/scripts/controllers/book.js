'use strict';
//Book Controller's job is to recieve a book and prepare it to be displayed
angular.module('angularPassportApp')
.controller('BookCtrl', ['$scope', '$http',
	function getBook ($scope, $http) {
		$http.get('api/books/').success(function(response) {
			console.log("I received the book");
			console.log(respnse);
		 	$scope.books=response;
		});
	}
]);

