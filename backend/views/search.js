var Book = require('../models/book.js'),
		async = require('async'),
		User = require('../models/user.js');


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

	