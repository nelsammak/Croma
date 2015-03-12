var User = require('../models/user.js');
module.exports = function(router, logger) {

    router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.save(function(err) {
            if(err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    });


};
