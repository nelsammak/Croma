var mongoose = require('mongoose'),
LocalStrategy = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy,
passport = require('passport');
 var User = require('../models/user');
      var configAuth = require('./auth');

module.exports = function () {
      // Serialize sessions
      passport.serializeUser(function(user, done) {
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
            User.find({} ,function (err, users) {
         })
            User.findOne({ email: email }, function (err, user) {
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
// FACEBOOK
    // =========================================================================
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true 
    },
    function(req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                    system.out.print( newUser.facebook.id );
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));
 
  }