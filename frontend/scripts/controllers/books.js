'use strict';
//Books Controller's job is to send the book collection in JSON format
angular.module('angularPassportApp')
.controller('BooksCtrl', ['$scope', '$http',
	function sendBookCollection ($scope, $http) {
		$http.get('api/books').success(function(response) {
			console.log("I received the DATA");
		 	$scope.books=response;
		});
	}
]);

//response to view bio button and routing to a specific book
angular.module('angularPassportApp')
  .controller('BioCtrl', function ($scope,$routeParams, $location,$window, ShareService) {
   $scope.viewBio = function(id) {
    $location.path ('books/'+id);
    ShareService.setValue(id);
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