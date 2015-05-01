var app = angular.module('angularPassportApp');

/** 
 * @function searchResultCtrl
 * Search result page controller
 * @param  {Object} $scope         
 * @param  {Object} $location      
 * @param  {Object} $interval     
 * @param  {Array}  searchService) 
 */
app.controller('searchResultCtrl', function searchResultCtrl($scope,$location, $interval, searchService) {
  
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

  /**
  * @function upDateSearchResults
  * Updates search results from service every 500 ms
  */
  $interval(function upDateSearchResults() {
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


  /**
  * @function bookPageChanged
  * changes the current page to the selected page
  * @params {int} page - selected page 
  */
  $scope.bookPageChanged = function bookPageChanged(page) {
    $scope.currentBookPage = page;
  }

  /**
  * @function booksNotifyAdjust
  * changes the total number of books to display
  */
  $scope.booksNotifyAdjust = function booksNotifyAdjust() {
    if ($scope.totalBooks == 0) {
      $scope.booksNotify = '';
    }
    else {
      $scope.booksNotify = '(' + $scope.totalBooks + ')';
    }
  }

  /**
  * @function usersNotifyAdjust
  * changes the total number of users to display
  */
  $scope.usersNotifyAdjust = function usersNotifyAdjust() {
    if ($scope.totalUsers == 0) {
      $scope.usersNotify = '';
    }
    else {
      $scope.usersNotify = '(' + $scope.totalUsers + ')';
    }
  }

  /**
  * @function numberOfBookPages
  * calculates total number of books pages to display
  */
  $scope.numberOfBookPages = function numberOfBookPages() {
    $scope.totalBookPages = Math.ceil($scope.totalBooks / $scope.itemsPerPage);
  }

  /**
  * @function numberOfUserPages
  * calculates total number of users pages to display
  */
  $scope.numberOfUserPages = function numberOfUserPages() {
    $scope.totalUserPages = Math.ceil($scope.totalUsers / $scope.itemsPerPage);
  }

  /**
  * @function userPageChanged
  * changes the current page to the selected page
  * @params {int} page - selected page 
  */
  $scope.userPageChanged = function userPageChanged(page) {
    $scope.currentUserPage = page;
  }

  /**
  * @function filterBooks
  * filter the books to be shown in pages
  */
  $scope.$watch('currentBookPage + itemsPerPage', function filterBooks() {
      var begin = (($scope.currentBookPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.filteredBooks = $scope.books.slice(begin, end);
    });

  /**
  * @function filterUsers
  * filter the users to be shown in pages
  */
  $scope.$watch('currentUserPage + itemsPerPage', function filterUsers() {
      var begin = (($scope.currentUserPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;

      $scope.filteredUsers = $scope.users.slice(begin, end);
    });
  
});

  
