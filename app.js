
(function(){
/*viewing books module*/
	var app = angular.module('viewBooks', []);
/*viewing books controller*/
	app.controller('viewBooksController', function(){
		this.products = books;
	});
	/*books array*/	
	var books = [
		{
			name: "Harry Potter and the Philosopher's Stone",
			author: "J. K. Rowling",
			image:  'Assets/Harry_Potter_and_the_Philosophers_Stone_Book_Cover.jpg'
			
		},
		{
			name: "Harry Potter and the Chamber of the Secrets",
			author: "J. K. Rowling",
			image:  'Assets/Harry_Potter_and_the_Chamber_of_Secrets.jpg'
		},
		{
			name: "Harry Potter and the Prisoner of Azkaban",
			author: "J. K. Rowling",
			image:  'Assets/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg'
			
		},
		{
			name: "Harry Potter and the Goblet of Fire",
			author: "J. K. Rowling",
			image:  'Assets/Harry_Potter_and_the_Goblet_of_Fire.jpg'
			
		},
		{
			name: "Harry Potter and the Order of the Phoenix",
			author: "J. K. Rowling",
			image:  'Assets/200px-Harry_Potter_and_the_Order_of_the_Phoenix.jpg'
			
		},
		];



})();
