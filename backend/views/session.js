var passport = require('passport');
var session = require('../config/session');
module.exports = function(router) {

    router.route('/sessions')
        .delete(function (req, res) {
          if(req.user) {
            req.logout();
            res.send(200);
          } else {
            res.send(400, "Not logged in");
          }
        })

        .post(function (req, res, next) {
          console.log('Posted Request before authentication: ', req.body);
          passport.authenticate('local', function(err, user, info) {
            console.log('Ady kol 7aga err: ', err, 'user', user 
              , 'info' , info);
            var error = err || info;
            if (err) { 
                return next(error); 
            }
            req.logIn(user, function(err) {
              if (err) { 
                return next(err); 
              }
              res.json(req.user.user_info);
            });
          })(req, res, next);
        })
       
};
