var Books = require('../models/book.js');

module.exports = function(router) {

	//Route to get the list of all books
	router.route('/books').get(function getBooksCollection(req, res, next) {
		Books.find(function findAllBooks(err, books) {
			if (err) {
				return next(err);
			}
			res.json(books);
		});
	});

	//Route to get the specific book's text
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

	//Route to get the specific book's average Rating
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

	//Route to get the specific book's bio page containing the book bio, cover and average rating
	router.route('/books/:id').get(function getBook(req, res, next) {
		var id = req.params.id;
			Books.findOne({'_id': id}, function findBook(err, book) {
				if (err) {
					res.status(404).json(err);
					return next(err);
				}
				res.json({book: book});
			})
	});

	//Route to get the New Arrivals
	router.route('/newarrivals').get(function getBook(req, res, next) {
		var id = req.params.id;
		Books.find({}).sort('-arrivalTime').exec(function (err, books) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			res.status(200).json(books.slice(0, Math.min(5, books.length)));
		});
	});

	//Route to rate the specific book
	router.route('/books/:id/rate').post(function rateBook(req, res, next) {
		var bookId = req.params.id;
		Books.findOne({'_id': bookId}, function findBook(err, book) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}

			var alreadyRatedByThisUser = false;
			var userId = req.body.userId;
			var rating = String(req.body.rating);

			console.log('user: ' +  userId + ', type: ' + typeof userId);
			console.log('book: ' +  book._id + ', type: ' + typeof book._id);
			console.log('rating: ' +  rating + ', type: ' + typeof rating);
			console.log('book ratings length: ' + book.ratings.length);

			for (var i = 0; i < book.ratings.length; i++) {
				if (book.ratings[i].id == userId) {
					alreadyRatedByThisUser = true;
					book.ratings[i]['rating'] = rating;	//Update the rating if already have rated
					break;
				}
			}

			if (!alreadyRatedByThisUser) {
				book.ratings.push({id: userId, rating: rating});
				book.markModified('ratings');
				book.save();
				res.json("Rated the book successfully");
			}
			else {
				book.markModified('ratings');
				book.save();
				res.json("Updated the book rating successfully");
			}

		})
	});

	//Route to get the books of the specified genre
	router.route('/genre/:genre').get(function getBookText(req, res, next) {
		console.log("yeskarim123");
		var genre = req.params.genre;
		Books.find({ genres: genre }, function findBooksByGenre (err, books) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			res.json(books);
		})
	});
};

