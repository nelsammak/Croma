
var mongoose       = require('mongoose'),
    LocalStrategy  = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    FacebookStrategy = require('passport-facebook').Strategy,
    passport       = require('passport'),
    configAuth     = require('./auth'),
    User           = require('../models/user');



    



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

// use GOOGLE strategy
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email
                    newUser.username = newUser.google.name;
                    newUser.email = newUser.google.email;
                    newUser.password = "123456789";      //default value won't be use in anything
                    newUser.age ="";
                    //newUser.gender = "";
                    newUser.address = "";

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));


// use Facebook Strategy
/*
    *@function getUsers - Called on GET "/api/users"
    *@params {Object} req - Http request
    *@params {Object} res - Http response
    *@params {facebookId} next - Next middleware
    *@returns {JSON} All users in Database as JSON 
*/

 passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();// set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token;// we will save the token that facebook provides to the user  
                    newUser.facebook.name  = profile.name.givenName  + '-' + profile.name.familyName ; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.username       = newUser.facebook.name;
                    newUser.email          = newUser.facebook.email;
                    newUser.password       = "123456789"; //init password won't be used
                    newUser.firstName      = "";
                    newUser.lastName       = "";  
                    newUser.age            = "";
                   // newUser.gender         = "";
                    newUser.address        = "";


                    //console.log(profile.id);

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err){
                          console.log(err);
                            throw err;
                        }

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
}



 
