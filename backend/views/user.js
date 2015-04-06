var User = require('../models/user.js');

/**
* A module to export Signing up routes
*   @module User
*/
module.exports = function(router) {                        
	
	/**
	*	@function getUsers - Called on GET "/api/users"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} All users in Database as JSON
 	*/
	router.route('/users')
		.get(function getUsers(req,res,next) {
			User.find({}, function  getUsersDb(err, users) {
				if (err) {
						next(err);
				} else {
						res.status(201);
						res.json(users);
				}
			});
		})
	/**
	*	@function PostUsers - Creates a user on Post "/api/users"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} Created user as JSON
 	*/
		.post(function PostUser(req, res, next) {
			var user = User.create({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					age: req.body.age,
					address: req.body.address,
					gender: req.body.gender,
					profilePhoto: req.body.profilePhoto,
					admin: req.body.admin
					},  function createUser(err, user) {
								if (err) {
									console.log(err);
									res.status(400).json(err);
								} 
								else {
									res.status(201).json(user);
								}
							});
		});
};
