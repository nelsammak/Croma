'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function($scope, $http, $location, $modal, ShareService, EpubService) {

    $http.get('api/books/' + ShareService.getValue()).success(function(response) {
      console.log("I received the book");

      $scope.book=response.book;
      $scope.bookID = response.book._id
      });

      //function to get the avg rating of a book
      $http.get('api/books/' + ShareService.getValue() + '/avgRating').success(function(rating) {
        console.log("avg rating is " + rating);
        $scope.book.avgRating = rating;
      });

      //get the rating of the current user of that book
      $http.post('api/books/' + ShareService.getValue() + '/getrate', {
          userId: $scope.currentUser._id
        })
        .success(function(num) {
          $scope.rating = {}
          $scope.rating = num;
          console.log("user rating is " + num);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      /**
      * @function getIsTobeRead
      * @determines whether the book is on the current user tobe read list or not
      * @param {boolean} bool - is Book on to-be read list
      */
      $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
        .success(function getIsTobeRead(bool) {
          $scope.book.tobeRead=bool;
          console.log("user added book " + bool);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    });

   /**
   * @function rate  
   * sends user rating to backend
   * @param {int} userRating - user rating
   */
    $scope.rate = function rate(userRating) {
      $http.post('api/books/'+ShareService.getValue()+'/rate', {userId: $scope.currentUser._id, rating: userRating})
        .success(function(response) {
          //function to get the avg rating of a book
          $http.get('api/books/' + ShareService.getValue() + '/avgRating').success(function(rating) {
            console.log("avg rating is" + rating);
            $scope.book.avgRating = rating;
          });
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      $http.post('api/books/'+ShareService.getValue()+'/getrate', {userId: $scope.currentUser._id})
        .success(function(num) {
          $scope.rating = {}
          $scope.rating=num;

    };


    /**
      * @function aadTobeRead
      * @adds a book to user's to be read list
    */
    $scope.addTobeRead = function() {
      $http.post('api/books/'+ShareService.getValue()+'/ToBeRead')
        .success(function(response) {
          $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
          .success(function(bool) {
          $scope.book.tobeRead=bool;
        })
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };
    /**
      * @function removeTobeRead
      * @deletes a book from user's to be read list
    */
    $scope.removeTobeRead = function() {
      $http.delete('api/books/'+ShareService.getValue()+'/ToBeRead')
        .success(function(response) {
          $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
          .success(function(bool) {
          $scope.book.tobeRead=bool;
           console.log("user added book" + bool);
            })
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.sendReading = function(bookid) {
      $http.post('/api/books/' + $scope.bookID + '/currentlyReading').success(function(response) {
        console.log(response);
      });
    }

    /**
     * @function removeBook
     * Sends delete request
     */
    $scope.removeBook = function removeBook() {

      swal({
        title: "Are you sure?",
        text: "You will not be able to recover the book!",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function() {
        $http.delete('/api/books/' + $scope.book._id).success(function bookRemoved(response) {
          $location.path('/books');
        })
      });
    }

    /**
     * @function broadCastEpub
     * Saves the book in epubService
     */
    $scope.broadCastEpub = function broadCastEpub() {
            console.log('SCOPE BOOK', $scope.book);
            EpubService.setValue($scope.book);
            $location.path('/bookreader');
        }



  });
