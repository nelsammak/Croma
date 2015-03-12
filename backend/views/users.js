var User = require('../models/user.js');
module.exports = function(router, logger) {

    router.route('/users')
        .post(function(req, res, next) {
            var user = User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }, function(err, user) {
                console.log("help");
                if (err) {
                    next(err);
                } else {
                    res.status(201);
                    res.json(user);
                }
            });
        });
};
