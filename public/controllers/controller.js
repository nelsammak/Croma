var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
$http.get('/books').success(function(response){
	console.log("I received the DATA")
	 $scope.books=response;
});

   
   
}]);
  
