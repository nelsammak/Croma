
(function(){
/*viewing books module*/
	var app = angular.module('viewBooks', []);
/*viewing books controller*/
	app.controller('viewBooksController', function(){
		this.products = books;
	});	
	var books = [
		{
			name: "Harry Potter",
			author: "J.K.Rolling"
		},
		{
			name: "The Lord of the rings",
			author: "R.R.Tokins"
		}
		];



})();
