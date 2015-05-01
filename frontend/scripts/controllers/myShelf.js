'use strict';

angular.module('angularPassportApp')
.controller('ShelfCtrl', function getShelves ($scope, $http){

	$http.get('/api/users/' + $scope.currentUser._id + '/currentlyReading').success(function(response){
		$scope.currentBooks = response;
	});
	$http.get('/api/users/' + $scope.currentUser._id + '/toBeReadBooks').success(function(response){
		$scope.toBeRead = response;
	});
	$http.get('/api/users/' + $scope.currentUser._id + '/readBooks').success(function(response){
		$scope.Read = response;
	});

	/**
      * @function removeTobeRead
      * @param {int} bookId - id of the book clicked on
      * @deletes a book from user's to be read list
    */
	$scope.removeTobeRead = function(bookId) {
      $http.delete('api/books/'+bookId+'/ToBeRead')
        .success(function(response){
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

	
});