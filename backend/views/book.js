var Books = require('../models/book.js');
module.exports = function(router) {
	router.route('/books').get(function getBooksCollection (req, res, next) {
	  Books.find(function (err, books) {
	    if (err) {
	      next(err);
	    }
	    res.json(books);
	  });
	});
}