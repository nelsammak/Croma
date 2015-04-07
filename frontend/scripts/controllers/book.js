'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
   	$http.get('api/books/'+ShareService.getValue()).success(function(response) {
			console.log("I received the book");
		 	$scope.book=response.book;
		});
   	$scope.rating= {}
   	//rate function's job is to send to the backend am object consisting of a user and his rating
   	$scope.rate = function() {
   		console.log($scope.rating);
   	$http.post('api/books/'+ShareService.getValue()+'/rate',$scope.rating)
            .success(function(data) {
                $scope.book=response.book;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

   };
   //addTobeRead function's job is to send to the backend the request of a user to add a book to his to-be read list
    $scope.addTobeRead = function() {
      console.log($scope.rating);
    $http.post('api/books/'+ShareService.getValue()+'/addTobeRead',$scope.rating)
            .success(function(response) {
                console.log(response);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

   };


  });

  

  