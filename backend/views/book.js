'use strict';
var Books = require('../models/book.js');
var User = require('../models/user.js');
var BookUserRatings = require('../models/bookuserrating.js');
var cookieParser = require('cookie-parser');
var Mongoose = require('mongoose');
// var path = require('path');
/**
 * A module to export /books routes
 *	@module Book
 */
module.exports = function(router) {

	/**
	 * @function addToCurrentlyReading Called on POST "/api/books/:id/currentlyReading"
	 * Adds book to currently reading of the current user
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @params {Number} :id - ID of the book
	 * @return {String} {user: 'new User with currently reading updated'
	*/
	router.route('/books/:id/currentlyReading')
		.post(function addToCurrentlyReading (req, res, next) {
			var id = req.params.id;
			if (!req.user) {
				return next('User not logged in');
			}
			var user = req.user;

			Books.findOne({'_id': id}, function findBookText(err, book) {
				if (err) {
					res.json({err: err}).status(404);
				}
				if(user.currentlyReading.indexOf(book._id) === -1) {
					user.currentlyReading.push(book._id);
				}

				User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
					if (err) {

						return next(err);
					}
					res.json({user: newUser});
				})
			})
		})

	/**
	 * @function getBookText Called on GET "/api/books/:id/text"
	 * Returns books text and Adds book to currently reading of the current user
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @params {Number} :id - ID of the book
	 * @return {String} {user: 'new User with currently reading updated',
	* book: {text: 'Path of the epub book' }}
	 */
	router.route('/books/:id/text').get(function getBookText (req,res,next){
		var id = req.params.id;
		if (!req.user) {
			return next('User not logged in');
		}
		var user = req.user;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json({err: err}).status(404);
			}

			if(user.currentlyReading.indexOf(book._id) === -1) {
				user.currentlyReading.push(book._id);
			}

			User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
				if (err) {

					return next(err);
				}
				res.json({user: newUser, book: {text: book.text}});
			})
		})

	});

	/**
	 * @function getBook Called on GET "/api/books/:id"
	 * Returns book info
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @params {Number} :id - ID of the book
	 * @return {JSON} {book: {BOOK} }
	 */
	router.route('/books/:id').get(function getBook (req,res,next){
		var id = req.params.id;
		Books.findOne({'_id': id}, function findBook(err, book) {
			if (err) {
				return next(err);
			}
			res.json({book: book});
		});
	});
	/**
	 * @function getBookCollection Called on GET "/api/books"
	 * Returns All books
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { [{BOOKS}] }
	 */
	router.route('/books').get(function getBooksCollection (req, res, next) {
		Books.find(function findAllBooks(err, books) {
			if (err) {
				next(err);
			}
			res.json(books);
		});
	});

	/**
	 * @function getAllLabels Called on GET "/api/labels"
	 * Returns All books
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { [[{'each book labels'}]] }
	 */
	var getAllLabels = function (req, res, next) {
		Book.find({}, function (err, books) {
			if (err) {
				return next(err);
			}
			var labels = [];
			console.log('BOOOKS', books);
			for (var j = 0; j < books.length; j++) {
				for(var i = 0; i < books[j].labels.length; i++) {
					if (labels.indexOf(books[j].labels[i]) === -1) {
						labels.push(books[j].labels[i]);
					}
				}
			}
			res.status(200).json(labels);
		})
	}


	/**
	 * @function getLabels Called on GET "/api/books/:id/labels"
	 * Returns All labels of a book
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} {book: {labels: ['book labels']}}
	 */
	var getLabels = function (req, res, next) {
		var id = req.params.id;
		Book.findOne({'_id': id}, function (err, book) {
			if (err) {
				console.log('ERROR', err);
				return next(err);
			}
			if (book) {
				res.json({book: {labels: book.labels}});
			} else {
				res.json({err: 'Book not found'})
			}
		});
	}


	/**
	 * @function addLabels Called on Post "/api/books/:id/labels"
	 * Returns Book after old labels are removed and new ones added
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { book: {'book'} }
	 */
	var addLabels = function (req, res, next) {
		var id = req.params.id;
		var labels = req.body.labels;
		console.log('LABELS' , req.body);
		Book.findOne({'_id': id}, function (err, book) {
			if (err) {
				return next(err);
			}
			if(book) {
				console.log('Book LABELS', book.labels);
				book.labels = req.body.labels;
				book.save(function (err, newBook){
					if (err) {
						return next(err);
					}
					res.status(201).json({book: newBook});
				});
			}
		});
	}

	/**
	 * @function getBookAvgRating Called on Get "/api/books/:id/avgRating"
	 * Returns Book's average Rating
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { 'avgRating' }
	 */
	router.route('/books/:id/avgRating').get(function getBookAvgRating(req, res, next) {
		var id = req.params.id;
		Books.findOne({'_id': id}, function (err, book) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			res.json(book.avgRating);
		})
	});

	/**
	 * @function getMyRating Called on Get "/api/books/:id/getrate"
	 * Returns the User's rating of the Book
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { 'rating' }
	 */
	router.route('/books/:id/getrate').post(function getMyRating(req, res, next) {
		var id = Mongoose.Types.ObjectId(req.params.id);
		var userId = Mongoose.Types.ObjectId(req.body.userId);
		BookUserRatings.findOne({userId: userId, bookId: id}, function findBookText(err, bookUserRating) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			if(bookUserRating) {
				res.status(200).json(bookUserRating.rating);
			}
			else {
				res.status(200).json(0);
			}
		})
	});

	router.route('/books/:id/istoberead').post(function getIsToBeReadByMe(req, res, next) {
		var id = req.params.id;
		var userId = req.body.userId;
		User.findOne({'_id': userId}, function findBookText(err, user) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			if(user.toBeRead.indexOf(id)>=0) {
				res.json(true);
			}
			else {
				res.json(false);
			}
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

	/**
	 * @function rateBook Called on Get "/api/books/:id/rate"
	 * Rates the Book
	 * @params {Object} req - Http request
	 * @params {Object} res - Http response
	 * @params {Object} next - Next middleware
	 * @return {JSON} { 'message' }
	 */
	router.route('/books/:id/rate').post(function rateBook(req, res, next) {
		var id = Mongoose.Types.ObjectId(req.params.id);
		var userId = Mongoose.Types.ObjectId(req.body.userId);
		var rating = req.body.rating;
		BookUserRatings.findOne({userId: userId, bookId: id}, function (err, bookUserRating) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			if(bookUserRating) {
				Books.findById(id, function (err, book) {
					book.ratingsSum -= bookUserRating.rating;
					book.ratingsSum += rating;
					book.avgRating = book.ratingsSum / book.ratingsNum;
					book.save();
					bookUserRating.rating = rating;
					bookUserRating.save();
				});
			}
			else {
				Books.findById(id, function (err, book) {
					book.ratingsSum += rating;
					book.ratingsNum ++;
					book.avgRating = book.ratingsSum / book.ratingsNum;
					book.save();
					bookUserRating = new BookUserRatings({
						userId: userId,
						bookId: id,
						rating: rating
					});
					bookUserRating.save();
				});
			}
			res.status(200).json("Rated the Book Successfully");
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
	router.route('/books/:id/labels').get(getLabels).post(addLabels);
	router.route('/labels').get(getAllLabels);

}


