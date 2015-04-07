var Books = require('../models/book.js');
module.exports = function(router) {
	router.route('/books').get(function getBooksCollection(req, res, next) {
		Books.find(function findAllBooks(err, books) {
			if (err) {
				return next(err);
			}
			res.json(books);
		});
	});

	router.route('/books/:id/text').get(function getBookText(req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			res.json({book: {text: book.text}});
		})
	});

	router.route('/books/:id/rating').get(function getBookText(req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			var sumOfRatings = 0;
			for (var i = 0; i < book.ratings.length; i++) {
				sumOfRatings += parseInt(book.ratings[i].rating);
			}
			console.log(sumOfRatings);

			if (book.ratings.length > 0) {
				res.json({book: {avgRating: (sumOfRatings / book.ratings.length)}});
			}
			else {
				res.json({book: {avgRating: -1}});
			}
		})
	});

	router.route('/books/:id').get(function getBook(req, res, next) {
		var id = req.params.id;
		if (id == 'newarrivals') {
			Books.find({}).sort('-arrivalTime').exec(function (err, books) {
				if (err) {
					res.status(404).json(err);
					return next(err);
				}
				res.json({books: books});
			});
		}
		else {
			Books.findOne({'_id': id}, function findBook(err, book) {
				if (err) {
					res.status(404).json(err);
					return next(err);
				}
				res.json({book: book});
			})
		}
	});

	router.route('/books/:id/rating').post(function rateBook(req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBook(err, book) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			var alreadyRatedByThisUser = false;

			for (var i = 0; i < book.ratings.length; i++) {
				if (book.ratings[i].id == req.query.userID) {
					alreadyRatedByThisUser = true;
					book.ratings[i].rating = req.query.rating;
					break;
				}
			}

			if (!alreadyRatedByThisUser) {
				book.ratings.push({id: req.query.userID, rating: req.query.rating});
			}

			book.save();
			res.json("Rated the book successfully");
		})
	});

};

