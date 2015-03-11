
(function(){
/*viewing books module*/
	var app = angular.module('viewBooks', []);
	app.controller('viewBooksController', function(){
		this.product = book;
	});	
	var book = {
		name: "Harry Potter",
		author: "J.K.Rolling"
	}
})();
