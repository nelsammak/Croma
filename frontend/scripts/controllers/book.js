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
    $scope.review = '';
    $scope.reviews = [];
    $scope.hamada='';

    $scope.$watch($scope.hamada, function() {
      console.log('HAMADA', $scope.hamada)
    })
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

      //get a boolean value to determin whether the book is on the current user tobe read list or not
      $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
        .success(function(bool) {
          $scope.book.tobeRead=bool;
          console.log("user added book " + bool);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        //gets all reviews along with the user associated with that book
      $http.get('api/books/' + ShareService.getValue() + '/review')
      .success(function (response) {
        $scope.reviews = response;
        console.log('$scope.reviews', $scope.reviews);
      }).error(function(data) {
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
        .success(function (response) {
          $http.post('api/books/'+ShareService.getValue()+'/istoberead', {userId: $scope.currentUser._id})
          .success(function(bool) {
          $scope.book.tobeRead=true;
          console.log("user added book" + bool);
        })
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
      };

      $scope.sendReading = function (bookid){
      $http.post('/api/books/'+ $scope.bookID +'/currentlyReading').success(function(response){
        console.log(response);
      });
    };

    //writeReview sends the review along with the user and the book associated with that review
    $scope.writeReview = function (){
      console.log('$scope.review:' , $scope.review);
      $http.post('api/books/' + $scope.book._id + '/review',{'review' : $scope.review })
      .success(function (response) {
        $scope.reviews.push(response);
        console.log('$scope.reviews', $scope.reviews);
      })
      $scope.review = '';
    };
    $scope.displayReview = function(reviewList){
      console.log('reviewList'. reviewList)
    }

  });