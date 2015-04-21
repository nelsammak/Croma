angular.module('angularPassportApp')
.controller('searchResultCtrl', function($scope,$location,searchService) {
  $scope.users = searchService.getUsers();
  $scope.books = searchService.getBooks();
});