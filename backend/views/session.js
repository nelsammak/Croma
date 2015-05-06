var passport = require('passport'),
	 session = require('../config/session');

/**
* A module to export login and logout routes
* @module Session
*/
module.exports = function(router) {

	/**
	*	@function logOut - Called on DELETE "/api/sessions"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} Status 204 if succesfully signed out else 400
 	*/
		router.route('/sessions')
				.delete(function logOut(req, res) {
					if(req.user) {
						req.logout();
						res.send(204);
					} else {
						res.send(400, "Not logged in");
					}
				})

	/**
	*	@function logIn - Called on POST "/api/sessions"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} User info of the user just logged in
 	*/
				.post(function logIn(req, res, next) {
					passport.authenticate('local', function(err, user, info) {
						var error = err || info;
						if (error) { 
								return res.json(400, error); 
						}
						req.logIn(user, function(err) {
							if (err) { 
								return res.send(err); 
							}
							res.json(req.user);
						});
					})(req, res, next);
				})
				.get(function getLoggedInUser(req, res, next) {
					if (!req.user) {
						return next('User not logged in');
					}
					res.json(req.user);

				})
			 
};
