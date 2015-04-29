/*'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
    $http.get('api/books/'+ShareService.getValue()).success(function(response) {
      console.log("I received the book");
      $scope.book=response.book;
       $scope.book.tobeRead=false;
});
      //function to get the avg rating of a book
      $http.get('api/books/'+ShareService.getValue()+'/avgRating').success(function(rating) {
      console.log("avg rating is " + rating);
      $scope.book.avgRating=rating;
      });

      //get the rating of the current user of that book
      $http.post('api/books/'+ShareService.getValue()+'/getrate', {userId: $scope.currentUser._id})
        .success(function(num) {
          $scope.rating = {}
          $scope.rating=num;
          console.log("user rating is " + num);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      //get a boolean value to determin whether the book is on the current user tobe read list or not
      $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
        .success(function(bool) {
          $scope.book.tobeRead=bool;
          console.log("user added book " + bool);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    });

    

    //rate function's job is to send to the backend an object consisting of a user and his rating
    $scope.rate = function() {
      console.log('user: ' +  $scope.currentUser._id);
      console.log('book: ' +  ShareService.getValue());
      console.log('rating: ' +  $scope.rating);
      $http.post('api/books/'+ShareService.getValue()+'/rate', {userId: $scope.currentUser._id, rating: $scope.rating})
        .success(function(response) {
          //function to get the avg rating of a book
          $http.get('api/books/'+ShareService.getValue()+'/avgRating').success(function(rating) {
           console.log("avg rating is" + rating);
            $scope.book.avgRating=rating;
          });
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
          $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
          .success(function(bool) {
          $scope.book.tobeRead=true;
          console.log("user added book" + bool);
        })
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };

  });
*/


'use strict';

///Book Controller's main job is to recieve a book and prepare it to be displayed with all its info
angular.module('angularPassportApp')
  .controller('BookCtrl', function ($scope, $http, ShareService) {
    $http.get('api/books/'+ShareService.getValue()).success(function(response) {
      console.log("I received the book");
      $scope.book=response.book;
      $scope.bookID = response.book._id
      $scope.book.tobeRead=false;

      //function to get the avg rating of a book
      $http.get('api/books/'+ShareService.getValue()+'/avgRating').success(function(rating) {
      console.log("avg rating is " + rating);
      $scope.book.avgRating=rating;
      });

      //get the rating of the current user of that book
      $http.post('api/books/'+ShareService.getValue()+'/getrate', {userId: $scope.currentUser._id})
        .success(function(num) {
          $scope.rating = {}
          $scope.rating=num;
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

    

    //rate function's job is to send to the backend an object consisting of a user and his rating
    $scope.rate = function() {
      console.log('user: ' +  $scope.currentUser._id);
      console.log('book: ' +  ShareService.getValue());
      console.log('rating: ' +  $scope.rating);
      $http.post('api/books/'+ShareService.getValue()+'/rate', {userId: $scope.currentUser._id, rating: $scope.rating})
        .success(function(response) {
          //function to get the avg rating of a book
          $http.get('api/books/'+ShareService.getValue()+'/avgRating').success(function(rating) {
           console.log("avg rating is" + rating);
            $scope.book.avgRating=rating;
          });
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
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
        })
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      };

      $scope.sendReading = function(bookid){
      $http.post('/api/books/'+ $scope.bookID +'/currentlyReading').success(function(response){
        console.log(response);
      });
    }

    

  });