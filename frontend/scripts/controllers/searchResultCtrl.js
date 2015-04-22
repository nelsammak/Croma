angular.module('angularPassportApp')
.controller('searchResultCtrl', function($scope,$location, $interval, searchService) {
  
  $interval(function () {
    $scope.users = searchService.getUsers();
    $scope.books = searchService.getBooks();
  }, 500);

  $scope.redirectToProfile = function redirectToProfile (user_id) {
      $location.path('/profile');
  }

});