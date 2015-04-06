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
		var user = req.user;
		console.log(user);

		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				return next(err);
			}

			if(user.currentlyReading.indexOf(book._id) === -1) {
				user.currentlyReading.push(book._id);
				User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
					if (err) {
						return next(err);
					}	
				});
			}
			res.json({book: {text: book.text}});
		});
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