var Books = require('../models/book.js');
module.exports = function(router) {
	router.route('/books').get(function getBooksCollection (req, res, next) {
	  Books.find(function findAllBooks(err, books) {
	    if (err) {
	      next(err);
	    }
	    res.json(books);
	  });
	});

	router.route('/books/:id/text').get(function getBookText (req,res,next){
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBook(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
			res.json(book.text);
		})
	}) 
}