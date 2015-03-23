var User = require('../models/user.js');
module.exports = function(router) {
    router.route('/users')
        .get(function (req,res,next) {
            User.find({}, function (err, users) {
                if (err) {
                    next(err);
                } else {
                    res.status(201);
                    res.json(users);
                }
            });
        })
        .post(function(req, res, next) {
            var user = User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                address: req.body.address,
                gender: req.body.gender,
                profilePhoto: req.body.profilePhoto
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    res.status(201);
                    res.json(user);
                }
            });
        });
    
};
