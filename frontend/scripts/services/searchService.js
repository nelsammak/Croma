angular.module('angularPassportApp')
.service('searchService', function ($http, $location) {
	var users = [];
	var books = [];
    
    /**
  * @function search
  * send searchTerm to be search for in database
  * @params {String} searchTerm - search term
  * @return {Object} {user: 'users matched with search term', books: 'books matched
  *   search term'  
  */
    this.search = function search(searchTerm) {
    	 $http.get('/api/search', {
                params: {searchTerm: searchTerm} 
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