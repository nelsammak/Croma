'use strict';
var Books = require('../models/book.js');
var UserBook = require('../models/user_book.js');
// var path = require('path');
module.exports = function(router) {
	router.route('/books').get(function getBooksCollection (req, res, next) {
	  Books.find(function findAllBooks(err, books) {
	    if (err) {
	      next(err);
	    }
	    res.json(books);
	  });
	});

	router.route('/books/:id/').get(function getBook (req,res,next){
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
* routes /api/books/:id/text?user='userID' where user='userID' is a query
*		string parameter. returns a JSON {book: {text: 'path of the book'}}
*/
	router.route('/books/:id/text').get(function getBookText (req,res,next){
		var id = req.params.id;
		var user = req.query.user;
		Books.findOne({'_id': id}, function findBookText(err, book) {
			if (err) {
				res.json(404, err);
				next(err);
			}
		UserBook.findOrCreate({user: user, book: id}, function (err, userbook) {
			userbook.reading = true;
			userbook.save(function () {
				console.log(userbook);
			});
		})
			res.json({book: {text: book.text}});
			// res.sendFile(path.join(__dirname, '../../frontend', book.text));

		})
	});
};