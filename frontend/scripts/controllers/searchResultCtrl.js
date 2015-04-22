var app = angular.module('angularPassportApp');


app.controller('searchResultCtrl', function($scope,$location, $interval, searchService) {
  
    $scope.books = [];
    $scope.users = [];
  

  $interval(function () {
    $scope.users = searchService.getUsers();
    $scope.books = searchService.getBooks();
    $scope.itemsPerPage = 12
    $scope.currentPage = 1;
    $scope.totalItems = $scope.books.length;  

  }, 500);
  

  $scope.pageCount = function () {
    return Math.ceil($scope.books.length / $scope.itemsPerPage);
  };
  
  $scope.redirectToProfile = function redirectToProfile (user_id) {
      $location.path('/profile');
  }

});