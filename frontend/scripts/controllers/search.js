
bookSearch.controller('searchCtrl', ['searchService', '$scope', '$location', function(books, $scope, $location) {

 
  // Initialize the scope defaults.
  $scope.books = [];        // An array of book results to display
  $scope.page = 0;            // A counter to keep track of our current page
  $scope.allResults = false;  // Whether or not all results have been found.
 
 
  /**
   * A fresh search. Reset the scope variables to their defaults, set
   * the q query parameter, and load more results.
   */
  $scope.search = function() {
    $scope.page = 0;
    $scope.books = [];
    $scope.allResults = false;
    $location.search({'q': $scope.searchTerm});
    $scope.loadMore();
  };
 
  /**
   * Load the next page of results, incrementing the page counter.
   * When query is finished, push results onto $scope.books and decide
   * whether all results have been returned (i.e. were 10 results returned?)
   */
  $scope.loadMore = function() {
    books.search($scope.searchTerm, $scope.page++).then(function(results) {
      if (results.length !== 10) {
        $scope.allResults = true;
      }
 
      var ii = 0;
 
      for (; ii < results.length; ii++) {
        $scope.books.push(results[ii]);
      }
    });
  };
 
  // Load results on first run
  $scope.loadMore();
}]);
