'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
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
)}
));

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
}
