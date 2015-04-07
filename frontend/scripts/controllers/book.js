'use strict';

///Book Controller's job is to recieve a book and prepare it to be displayed
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {

   	$http.get('api/books/'+ShareService.getValue()).success(function(response) {
			console.log("I received the book");
		 	$scope.book=response.book;
		});
	}, ['ngSanitize']);
