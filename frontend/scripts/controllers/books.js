'use strict';

//Books Controller's job is to send all books collection in JSON format
angular.module('angularPassportApp')
.controller('BooksCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {

      $scope.page="All books";
		$http.get('api/books').success(function(response) {
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
  function newArrivalsCollection ($scope, $http) {
    $scope.page="New Arrivals";
    $http.get('api/newarrivals').success(function(response) {
      console.log("I received the new arrivals");
      $scope.books=response;
    });
  }
]);

//genre display controller's job is  to request genre books from backend and display it
angular.module('angularPassportApp')
  .controller('GenreDisplayCtrl', function ($scope, $http, ShareService2) {
   $http.get('api/genre/'+ShareService2.getValue()).success(function(response) {
    $scope.page="All "+ShareService2.getValue()+ " Books";
      console.log("I received the genre");
      $scope.books=response;
    });
  });



//genre controller's job is  to  take the genre specified from html by click of user and request that genre from backend then route to it 
angular.module('angularPassportApp')
  .controller('GenreCtrl', function ($scope, $http, $routeParams, $location,$window, ShareService2) {
    $http.get('api/genre').success(function(response) {
      $scope.genres=response;
    });
    
    $scope.showGenre = function(genre) {
    ShareService2.setValue(genre);
    $location.path ('genre/'+genre);
   };
  });

//response to view bio button and routing to a specific book
angular.module('angularPassportApp')
  .controller('BioCtrl', function ($scope,$routeParams, $location,$window, ShareService) {
   $scope.viewBio = function(id) {
    $location.path ('books/'+id);
    ShareService.setValue(id);
    $scope.id = ShareService.getValue();
    console.log($scope.id);
   };
  });



//a service to pass id  from books Ctrl to book Ctrl
angular.module('angularPassportApp')
 .service('ShareService', function(){
    var id = 0;
    return {
            getValue: function () {
                return id;
            },
            setValue: function(value) {
                id = value;
            }
        };
 
});

 //a service to pass genre  from Genre Ctrl to Genre display Ctrl
angular.module('angularPassportApp')
 .service('ShareService2', function(){
    var genre = '';
    return {
            getValue: function () {
                return genre;
            },
            setValue: function(value) {
                genre = value;
            }
        };
 

});
