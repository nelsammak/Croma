'use strict';

angular.module('angularPassportApp')
.controller('BooksCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {
		$http.get('api/books').success(function(response) {
			console.log("I received the DATA");
		 	$scope.books=response;
		});
	}
]);

angular.module('angularPassportApp')
  .controller('BioCtrl', function ($scope,$routeParams, $location,$window) {
   $scope.viewBio = function(id) {
    $location.path ('/'+id);
    console.log("book id : "+ id);
   };
  });


//Book Controller's job is to send the book collection in JSON format