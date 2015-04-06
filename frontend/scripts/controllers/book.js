'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
   	$http.get('api/books/'+ShareService.getValue()).success(function(response) {
			console.log("I received the book");
		 	$scope.book=response.book;
		});
   	//rate function's job is to send the the backend the user who wants to rate a book and his rating
   	$scope.rate = function(rating) {
   	$http.post('api/books/'+ShareService.getValue(), id)
            .success(function(data) {
                $scope.book=response.book;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
   };
  });

  

  