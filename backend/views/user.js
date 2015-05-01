var User = require('../models/user.js');
var Alert = require('../models/alert.js')

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


		router.route('/users/:id/addToBeRead').post(function(req, res, next) {
        var userId = req.params.id;
        var bookId = req.body.bookId;
        User.findById(userId, function (err, user) {
          if (err) {
            res.status(404).json(err);
            return next(err);
          }
          if (user.toBeRead.indexOf(bookId) > -1) { //Already has the book in his Currently Reading List
            return res.json("Already has the book");
          }
          else {
            user.toBeRead.push(bookId);
          }
          user.save();
          res.json("Added the book successfully");
        });
    	});



/**
	*	@function PostAlert - Adds alert to all users on Post "/api/alert"	
	*	@params {Object} req - Http request
	* @params {Object} res - Http response
	*	@params {Object} next - Next middleware
	*	@returns {JSON} "added alert successfully"
 	*/
    	router.route('/alert')
		.post(function PostAlert(req, res, next) {
			var alert = Alert.create({
					message: req.body.message,
					type: req.body.type
					},  function createAlert(err, alert) {
								if (err) {
									console.log(err);
									res.status(400).json(err);
								} else {

									User.find({}, function (err, users) {
									if (err) {
												next(err);
								} else {
									users.forEach(function (user){
						
									user.alerts.push(alert.id);
									user.save();
										});
								res.status(201);
							res.json("Sent Alert successfully");
				}
			});
								}
							});
					
		});


		router.route('/alert/:id')
		.get(function getAlerts(req,res,next) {
			var id = req.params.id;
		User.findOne({'_id': id}).populate('alerts').exec(function getUser(err, user) {
			if (err) {
				return next(err);
			}
			else {

					res.json(user.alerts);
				
			}})

		})

		.post(function SendAlerts(req,res,next) {
			var id = req.params.id;
			var alerts = req.body.alrts;
		User.findOne({'_id': id}).populate('alerts').exec(function getUser(err, user) {
			if (err) {
				return next(err);
			}
			else {

				user.alerts = alerts;
				user.save();
				res.status(201);
				res.json("deleted Alert successfully");
				
			}})

		})

};
