angular.module('angularPassportApp', [])
.service('searchService', function () {
	var users = [];
	var books = [];
    this.search = function search(searchTerm) {
    	 $http.get('/api/search', {
                params: {searchTerm: $scope.searchTerm} 
            }).success(function (response) {
                users = response.users;
                books = response.books;
                $location.path('/searchResults')
            });
    }
    this.getUsers = function getUsers() {
    	return users;
    }
    this.getBooks = function getBooks() {
    	return books;
    }
})