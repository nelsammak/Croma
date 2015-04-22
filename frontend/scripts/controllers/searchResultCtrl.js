var app = angular.module('angularPassportApp');


app.controller('searchResultCtrl', function($scope,$location, $interval, searchService) {
  
    $scope.books = [];
    $scope.users = [];
    $scope.itemsPerPage = 12
    $scope.currentPage = 1;
    $scope.totalItems = 0;


  $interval(function () {
    if (searchService.getUsers() != $scope.users || $scope.books != searchService.getBooks()) {
      $scope.users = searchService.getUsers();
      $scope.books = searchService.getBooks();
      $scope.totalItems = $scope.books.length;
      $scope.filteredBooks = $scope.books.slice(0, $scope.itemsPerPage)
    }

  }, 500);


  $scope.pageCount = function () {
    return Math.ceil($scope.books.length / $scope.itemsPerPage);
  };
  
  $scope.pageChanged = function(page) {
    $scope.currentPage = page;
  }

  $scope.$watch('currentPage + itemsPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.filteredBooks = $scope.books.slice(begin, end);
    });
  
});