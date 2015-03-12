var models  = require('../models');
module.exports = function(router, logger) {

    router.get('/users', function(req, res) {
        models.User.findAll().then(function (users) { 
            res.json(users);
        });
    });

    router.post('/users', function(req, res, next) {
            models.User.create({
                username: req.body.username,
                email: req.body.email
            }).then(function (user) {
                user.setPassword(req.body.password, function() {
                    user.save();
                    res.status(201);
                    res.json(user);
                });
                
            }).catch( function (err) {
                next(err);
            });
    });


};
