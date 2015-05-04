'use strict';

//Books Controller's job is to send all books collection in JSON format
angular.module('angularPassportApp')
  .controller('BooksCtrl', ['$scope', '$http',
    function sendBookCollection($scope, $http) {

      $scope.page = "All books";
      $http.get('api/books').success(function(response) {
        console.log("I received the DATA");
        $scope.books = response;
      });
      $scope.sendReading = function(bookid) {
        $http.post('/api/books/' + bookid + '/currentlyReading').success(function(response) {});
      }

      /**
       * @function removeBook
       * Send Delete request
       * @param  {int} id - ID of the book to be deleted
       * 
       */
      $scope.removeBook = function(id) {

        swal({
          title: "Are you sure?",
          text: "You will not be able to recover the book!",
          type: "error",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true
        }, function() {
          $http.delete('/api/books/' + id).success(function bookRemoved(response) {
            $scope.books = response.books;
          })
        })
      }

      $scope.orderByRatingF = function() {
      $scope.orderByRating = !$scope.orderByRating;
      if(!$scope.orderByRating) {
        $scope.page="All books";
        $http.get('api/books').success(function(response) {
          console.log("I received the DATA");
          $scope.books=response;
        });
      }
      else {
        $scope.page="All books ordered by rating";
        $http.get('api/booksbyrating').success(function(response) {
          console.log("I received the DATA");
          $scope.books=response;
        });
      }
    };
  }
]);



angular.module('angularPassportApp')
  .controller('BooksByRatingCtrl', ['$scope', '$http',
    function sendBookCollection ($scope, $http) {

      $scope.page="All books ordered by rating";
      $http.get('api/booksbyrating').success(function(response) {
        console.log("I received the DATA");
        $scope.books=response;
      });
      $scope.sendReading = function(bookid){
        $http.post('/api/books/'+ bookid +'/currentlyReading').success(function(response){
          console.log(response);
        });
      }
    }
  ]);

//New arrivals controller's job it to request new arrivals from backend and add it to the front end
angular.module('angularPassportApp')
  .controller('NewArrivalsCtrl', ['$scope', '$http',
    function newArrivalsCollection($scope, $http) {
      $scope.page = "New Arrivals";
      $http.get('api/newarrivals').success(function(response) {
        console.log("I received the new arrivals");
        $scope.books = response;
      });
    }
  ]);

/**
@function bestSellersCollocetion 
@gets all books that has labels best seller
@param {object} $scope - service
@param {object} $http - service
*/
angular.module('angularPassportApp')
  .controller('BestSellersCtrl', ['$scope', '$http',
    function bestSellersCollection($scope, $http) {
      $scope.page = "Best Sellers";
      $http.get('api/bestsellers').success(function(response) {
        $scope.books = response;
      });
    }
  ]);

//genre display controller's job is  to request genre books from backend and display it
angular.module('angularPassportApp')
  .controller('GenreDisplayCtrl', function($scope, $http, ShareService2) {
    $http.get('api/genre/' + ShareService2.getValue()).success(function(response) {
      $scope.page = "All " + ShareService2.getValue() + " Books";
      console.log("I received the genre");
      $scope.books = response;
    });
  });



//genre controller's job is  to  take the genre specified from html by click of user and request that genre from backend then route to it 

/**
  * @function Genre Called on "/genre" 
  * Genre controller
  * @param {Object} $scope - service
  * @param {Object} $http - service
  * @param {Object} $routeParams - service
  * @param {Object} $location - service
  * @param {Object} $window - service
  * @param {Object} $shareService2 - service
  */
angular.module('angularPassportApp')
  .controller('GenreCtrl',
  function Genre($scope, $http, $routeParams, $location,$window, ShareService2) {
  /**
  * @function getAllGenres
  * @gets all genres
  * @param {JSON} response - genres
  */
    $http.get('api/genre').success(function getAllGenres(response) {
      $scope.genres=response;
    });
    /**
  * @function showGenre Called on GET "/genre/:genre"
  * @param {String} genre - genre
  */
    $scope.showGenre = function showGenre(genre) {
    ShareService2.setValue(genre);
    $location.path ('genre/'+genre);
   };
  });

//response to view bio button and routing to a specific book
angular.module('angularPassportApp')
  .controller('BioCtrl', function($scope, $routeParams, $location, $window, ShareService) {
    $scope.viewBio = function(id) {
      $location.path('books/' + id);
      ShareService.setValue(id);
      $scope.id = ShareService.getValue();
    };
  });



