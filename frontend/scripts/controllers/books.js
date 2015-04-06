'use strict';

angular.module('angularPassportApp')
.controller('AppCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {
		$http.get('/api/books').success(function(response) {
		 	$scope.books=response;
		 	
		/*$http.get('/books2').success(function(response) {
			console.log("I received the DATA");
		 	$scope.books=response;*/
		});
		$scope.sendReading = function(bookid){
			$http.post('/api/books/'+ bookid +'/currentlyReading').success(function(response){
				console.log(response);
			});
		}
	}
]);
//Book Controller's job is to send the book collection in JSON format