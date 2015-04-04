'use strict';
//Book Controller's job is to send the book collection in JSON format
angular.module('angularPassportApp')
.controller('BookCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {
		$http.get('api/books').success(function(response) {
			console.log("I received the DATA");
		 	$scope.books=response;
		});
	}
]);

//response to view bio button and routing to a specific book
angular.module('angularPassportApp')
  .controller('BioCtrl', function ($scope,$routeParams, $location,$window) {
   $scope.viewBio = function(id, name) {
    $location.path ('books/'+id);
    console.log("book id : "+ id);
   };
  });
