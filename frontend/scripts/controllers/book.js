'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
   	$http.get('api/books/'+ShareService.getValue()).success(function(response) {
			console.log("I received the book");
		 	$scope.book=response.book;
		});
   	//rate function's job is to send to the backend am object consisting of a user and his rating
   	$scope.rate = function(rating) {
   	console.log(rating);
   	$scope.rate= {
   		rating : rating,
   		user : $scope.currentUser._id
   	}
   	console.log($scope.rate.rating);
   	//$http.post('api/books/'+ShareService.getValue(),rating,$scope.currentUser._id)
            //.success(function(data) {
              //  $scope.book=response.book;
            //})
            //.error(function(data) {
              //  console.log('Error: ' + data);
            //});
   };
  });

  

  