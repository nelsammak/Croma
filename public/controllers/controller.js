var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/books').success(function(response){
	console.log("I received the DATA")
	 $scope.books=response;
});

   
   
}]);
  
