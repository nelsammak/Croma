var app = angular.module('angularPassportApp');


app.controller('searchResultCtrl', function($scope,$location, $interval, searchService) {
  
    $scope.books = [];
    $scope.users = [];
    $scope.itemsPerPage = 12;
    $scope.currentBookPage = 1;
    $scope.currentUserPage = 1;
    $scope.totalBooks = 0;
    $scope.totalUsers = 0;
    $scope.totalBookPages = 0;
    $scope.totalUserPages = 0;
    $scope.booksNotify = '';
    $scope.usersNotify = '';




  $interval(function () {
      if (searchService.getUsers() != $scope.users || $scope.books != searchService.getBooks()) {
        $scope.users = searchService.getUsers();
        $scope.books = searchService.getBooks();
        $scope.totalBooks = $scope.books.length;
        $scope.totalUsers = $scope.users.length;
        $scope.numberOfBookPages();
        $scope.numberOfUserPages();
        $scope.usersNotifyAdjust();
        $scope.booksNotifyAdjust();
        $scope.filteredBooks = $scope.books.slice(0, $scope.itemsPerPage);
        $scope.filteredUsers = $scope.users.slice(0, $scope.itemsPerPage);
      }
  }, 500);


  
  $scope.bookPageChanged = function bookPageChanged(page) {
    $scope.currentBookPage = page;
  }

  $scope.booksNotifyAdjust = function booksNotifyAdjust() {
    if ($scope.totalBooks == 0) {
      $scope.booksNotify = '';
    }
    else {
      $scope.booksNotify = '(' + $scope.totalBooks + ')';
    }
  }

  $scope.usersNotifyAdjust = function usersNotifyAdjust() {
    if ($scope.totalUsers == 0) {
      $scope.usersNotify = '';
    }
    else {
      $scope.usersNotify = '(' + $scope.totalUsers + ')';
    }
  }

  $scope.numberOfBookPages = function() {
    $scope.totalBookPages = Math.ceil($scope.totalBooks / $scope.itemsPerPage);
  }

  $scope.numberOfUserPages = function() {
    $scope.totalUserPages = Math.ceil($scope.totalUsers / $scope.itemsPerPage);
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

  
