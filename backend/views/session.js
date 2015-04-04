var passport = require('passport');
var session = require('../config/session');
module.exports = function(router) {

    router.route('/sessions')
        .delete(function (req, res) {
          if(req.user) {
            req.logout();
            res.send(204);
          } else {
            res.send(400, "Not logged in");
          }
        })

        .post(function (req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            var error = err || info;
            if (error) { 
                return res.json(400, error); 
            }
            req.logIn(user, function(err) {
              if (err) { 
                return res.send(err); 
              }
              res.json(req.user.user_info);
            });
          })(req, res, next);
        })
       
};
