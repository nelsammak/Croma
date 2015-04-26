var Book = require('../models/book.js'),
		async = require('async'),
		User = require('../models/user.js');


/**
	* @function searchQuery Called on get "/api/search" 
	* Takes a query string with parameter searchTerm  
	* Search the term in Users username, first name, last name
	* and in Books name, author, genre.
	* @param {Object} req - Http request
	* @param {Object} res - Http response
	* @param {Object} next - Next middleware
	* @param {String} searchTerm:term to be search
	* @return {Object} {users: [users that matched], books: [books that matched]} 
	*/
module.exports = function(router) {
	router.route('/search')
	.get(function searchQuery(req, res, next) {
		var searchTerm = new RegExp(req.query.searchTerm, "i");
		
		async.parallel({
			users: function (cb) {
				User.find()
				.or([{'username' : {$regex :searchTerm} }
						,{'lastName' : {$regex :searchTerm} }
						,{'firstName' : {$regex :searchTerm}}])
				.exec(cb);
			},
			books: function(cb) {
				Book.find()
				.or([{'name' : {$regex :searchTerm} }
					  ,{'author' : {$regex :searchTerm} }
					  ,{'genres' : {$regex :searchTerm} }])
				.exec(cb);
			}
		}, function (err, searchResult) {
			if (err) {
				next(err);
			}
			res.json(searchResult);
		})
		
	})
}

	
