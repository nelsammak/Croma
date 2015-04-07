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

	router.route('/books/:id/text').get(function getBookText (req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
			res.json({book: {text: book.text}});
		})
	})

	router.route('/books/:id/rating').get(function getBookText (req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
			var ratingSum = 0;
			for (var i = 0; i < book.ratings.length; i++) {
				ratingSum += book.ratings[i];
			}
			if (book.ratings.length > 0) {
				res.json({book: {avgRating: (ratingSum / book.ratings.length)}});
			}
			else {
				res.json({book: {avgRating: 0}});
			}
		})
	})

	router.route('/books/:id').get(function getBook (req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBook(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
			res.json({book: book});
		})
	})

	router.route('/books/:id').post(function rateBook (req,res,next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBook(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
			var alreadyRatedByThisUser = false;
			var newRatings = book.ratings;
			for (var i = 0; i < book.ratings.length; i++) {
				if (ratings[i].id == id) {
					alreadyRatedByThisUser = true;
					newRatings[i].rating = req.params.rating;
					break;
				}
			}
			if (!alreadyRatedByThisUser) {
				newRatings.push({id: _id, rating: req.params.rating});
			}
			var conditions = { _id: 'id' };
			var update = { ratings: newRatings };
			var options = { multi: true };

			Model.update(conditions, update, options, callback);

			function callback (err, numAffected) {
				// numAffected is the number of updated documents
			}
		})
	})
};
