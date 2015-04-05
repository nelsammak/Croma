var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport');




module.exports = function () {

      var User = require('../models/user');

      // Serialize sessions
      passport.serializeUser(function(user, done) {
        console.log('Serialize this user ', user);
        done(null, user._id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
          done(err, user);
        });
      });

      // Use local strategy
      passport.use('local', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        },
          function(email, password, done) {
            console.log('User email before searching for it in database', email)
            User.find({} ,function (err, users) {
          console.log('DATABASE' , users);
         })
            User.findOne({ email: email }, function (err, user) {
                console.log('This is the user Found ', user);
                if (err) {
                return done(err);
                }

                if (!user) {
                return done(null, false, {
                  'errors': {
                  'email': { type: 'Email is not registered.' }
                  }
                  });
                }
                else {
                  user.verifyPassword(password, function(err, isMatch){
                	  if (err) {
                		done(err, null)
                	  }
                	  if (!isMatch) {
                		  return done(null, false, {
                      'errors': {
                        'password': { type: 'Password is incorrect.' }
                    	}
                      });
                	  }
                    else {
                    	      return done(null, user);
                    }
                  })
                }
            })
          }
      ));
}