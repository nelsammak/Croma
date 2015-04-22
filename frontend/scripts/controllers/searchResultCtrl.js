var app = angular.module('angularPassportApp');


app.controller('searchResultCtrl', function($scope,$location, $interval, searchService) {
  
    $scope.books = [];
    $scope.users = [];
    $scope.itemsPerPage = 12;
    $scope.currentBookPage = 1;
    $scope.currentUserPage = 1;
    $scope.totalItems = 0;


  $interval(function () {
    if (searchService.getUsers() != $scope.users || $scope.books != searchService.getBooks()) {
      $scope.users = searchService.getUsers();
      $scope.books = searchService.getBooks();
      $scope.totalItems = $scope.books.length;
      $scope.filteredBooks = $scope.books.slice(0, $scope.itemsPerPage);
      $scope.filteredUsers = $scope.users.slice(0, $scope.itemsPerPage);
    }

  }, 500);


  
  $scope.bookPageChanged = function(page) {
    $scope.currentBookPage = page;
  }

  $scope.userPageChanged = function(page) {
    $scope.currentUserPage = page;
  }

  $scope.$watch('currentBookPage + itemsPerPage', function() {
      var begin = (($scope.currentBookPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.filteredBooks = $scope.books.slice(begin, end);
    });

  $scope.$watch('currentUserPage + itemsPerPage', function() {
      var begin = (($scope.currentUserPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.filteredUsers = $scope.users.slice(begin, end);
    });
  
});

  
