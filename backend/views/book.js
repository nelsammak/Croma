<<<<<<< HEAD
'use strict';
var Books = require('../models/book.js');
var User = require('../models/user.js');
var cookieParser = require('cookie-parser');
// var path = require('path');
/**
* A module to export /books routes
*	@module Book
*/
module.exports = function(router) {


	router.route('/books/:id/currentlyReading')
	.post(function addToCurrentlyReading (req, res, next) {
		var id = req.params.id;
		if (!req.user) {
			return next('User not logged in');
		}
		var user = req.user;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				return next(err);
			}
		if(user.currentlyReading.indexOf(book._id) === -1) {
			user.currentlyReading.push(book._id);
		}
		
			User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
				if (err) {
					
					return next(err);
				}	
				res.json({user: newUser});
				console.log(newUser);
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
* @return {String} {book: {text: {Path of the epub book} }} 
*/
	router.route('/books/:id/text').get(function getBookText (req,res,next){
		var id = req.params.id;
		if (!req.user) {
			return next('User not logged in');
		}
		user = req.user;
		console.log(user);

		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				return next(err);
			}
		user.currentlyReading.push(book._id);

		User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
			if (err) {
				return next(err);
			}	
			console.log(newUser);
		})
		res.json({book: {text: book.text}});
		})
			// res.sendFile(path.join(__dirname, '../../frontend', book.text));
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
				res.json(404, err);
				next(err);
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
	    console.log(req.user);
	    console.log('Current Cookies', req.cookies);
	    if (err) {
	      next(err);
	    }
	    res.json(books);
	  });
	});
};
=======
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
			Books.findOne({'_id': id}, function findBook(err, book) {
				if (err) {
					res.status(404).json(err);
					return next(err);
				}
				res.json({book: book});
			})
	});

	router.route('/newarrivals').get(function getBook(req, res, next) {
		var id = req.params.id;
		Books.find({}).sort('-arrivalTime').exec(function (err, books) {
			if (err) {
				res.status(404).json(err);
				return next(err);
			}
			res.json(books.slice(0, Math.min(5, books.length)));
		});
	});

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

>>>>>>> aed1011f69770ecd261ce46136719ef2837a8095
