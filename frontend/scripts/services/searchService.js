angular.module('angularPassportApp')
.service('searchService', function ($http, $location) {
	var users = [];
	var books = [];
    
    /**
  * @function search
  * send searchTerm to be search for in database
  * @param {String} searchTerm - search term
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
    /**
     * get users from service
     * @return {Array} Users saved in service
     */
    this.getUsers = function getUsers() {
    	return users;
    }
    /** 
     * get Books from service
     * @return {Array} Books saved in service
     */
    this.getBooks = function getBooks() {
    	return books;
    }
})