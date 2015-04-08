'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
    $http.get('api/books/'+ShareService.getValue()).success(function(response) {
      console.log("I received the book");
      $scope.book=response.book;
    });

    $scope.rating = {}

    //rate function's job is to send to the backend am object consisting of a user and his rating
    $scope.rate = function() {
      console.log('user: ' +  $scope.currentUser._id);
      console.log('book: ' +  ShareService.getValue());
      console.log('rating: ' +  $scope.rating);
      $http.post('api/books/'+ShareService.getValue()+'/rate', {userId: $scope.currentUser._id, rating: $scope.rating})
        .success(function(response) {
          //$scope.book=data.book;
          console.log(response);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

   //addTobeRead function's job is to send to the backend the request of a user to add a book to his to-be read list
    $scope.addTobeRead = function() {
      console.log('user: ' +  $scope.currentUser._id);
      console.log('book: ' +  ShareService.getValue());
      $http.post('api/users/'+$scope.currentUser._id+'/addToBeRead', {bookId: ShareService.getValue()})
        .success(function(response) {
          console.log(response);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };

  });
