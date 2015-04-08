  var mongoose = require('mongoose'),
      Profile = require('../models/user.js'),
      Book = require('../models/book.js'),
      im = require('imagemagick'),
      util = require('util'),
      fs = require('fs'),
      _= require('lodash');

/**
* A module to export users profile related routes
* @module Profile
*/
module.exports = function(router) {
  router.route('/users/:id/currentlyReading').get(currentlyReadingBooks);
  router.route('/users/:id/readBooks').get(alreadyReadBooks);
  router.route('/users/:id/toBeReadBooks').get(toBeReadBooks);
  router.route('/users/:id').get(profile).put(editProfile);
  router.route('/check_username/:username').get(checkUserName);
};
 
  // GET
  var profile = function (req, res, next) {
    var id = req.params.id;
    Profile.findOne({ '_id': id }, function(err, profile) {
      if (err) {
        res.json(404, err);
        next(err);
      } else {
        console.log(profile);
        res.json({profile: profile});
      }
    });
  };

 

  // PUT
   var editProfile = function (req, res, next) {
    var id = req.params.id;
    Profile.findById(id, function (err, profile) {

      if(typeof req.body.profile["firstName"] != 'undefined'){
        profile["firstName"] = req.body.profile["firstName"];
      }  
      if(typeof req.body.profile["lastName"] != 'undefined'){
        profile["lastName"] = req.body.profile["lastName"];
      }  
      if(typeof req.body.profile["age"] != 'undefined'){
        profile["age"] = req.body.profile["age"];
      }  
      if(typeof req.body.profile["address"] != 'undefined'){
        profile["address"] = req.body.profile["address"];
      }  
      if(typeof req.body.profile["gender"] != 'undefined'){
        profile["gender"] = req.body.profile["gender"];
      } 
      if(typeof req.body.profile["user"] != 'undefined'){
        profile["user"] = req.body.profile["user"];
      } 

// If there is a photo upload the photo else return the response
if (!_.isUndefined(req.files) 
    && !_.isUndefined(req.files.profilePhoto)) {
// Upload the image file
console.log('To upload file');
console.log(req.files);

  uploadFile(req.files.profilePhoto, function(err, newPhotoName) {
        // If file type check fails
        if (newPhotoName === false) {
          // Return the error message
          return res.json({
            error: {
              type: err.type,
              message: err.message
            }
          });
        }

        // If there is error saving the file
        if (err) {
          return res.json({
          error: {
          type: 'system',
          message: 'System Error'
          }
          });
        }
        // Delete the old photo
        deletePhoto(user.profilePhoto);
        // If success saving the file
        profile.profilePhoto = newPhotoName;
         
            

        return profile.save(function (err) {
            if (!err) {
              console.log("updated profile");
              return res.json(200, profile.toObject());        
            } 
            else {
             return res.json(500, err);
            }
          return res.json({profile: profile});
        });
        });
      };
  });

};

/**
* @function checkUserName Called on GET "/api/check_username/:username" 
* Checks if username exists or not 
* @params {Object} req - Http request
* @params {Object} res - Http response
* @params {Object} next - Next middleware
* @params {Number} :username - username that needs to be checked
* @return {JSON} {exist: {TRUE OR FALSE}} 
*/
  var checkUserName = function checkUserName(req, res, next) {
        Profile.findOne({username : req.params.username}
          , function findUserCallback(err, user) {
              if (err) {
                  return next(new Error('Failed to load User' 
                      +  username));
              }
              if (user) {
                  res.json({exists: true});
              }
              else {
                  res.json({exits: false});
              }
        });
      };

  /**
* @function currentlyReadingBooks Called on GET "/api/users/:id/currentlyReading" 
* Returns currently reading book collection for a user 
* @params {Object} req - Http request
* @params {Object} res - Http response
* @params {Object} next - Next middleware
* @params {Number} :id - username that needs to be checked
* @return {JSON} {{Currently Reading Books}} 
*/
  var currentlyReadingBooks = function currentlyReadingBooks (req, res, next) {
    var userID = req.params.id;
    Profile.findOne({'_id': userID}).populate('currentlyReading')
          .exec(function userCurrentlyReadingBooks (err, user) {
            if (err) {
              return next(err);
            }
            res.json(user.currentlyReading);
            res.status(201);
          })
  };

  var alreadyReadBooks = function alreadyReadBooks (req, res, next) {
    var userID = req.params.id;
    Profile.findOne({'_id': userID}).populate('read')
          .exec(function userAlreadyReadBooks (err, user) {
            if (err) {
              return next(err);
            }
            res.json(user.read);
            res.status(201);
          })
  };

  var toBeReadBooks = function toBeReadBooks (req, res, next) {
    var userID = req.params.id;
    Profile.findOne({'_id': userID}).populate('toBeRead')
          .exec(function userToBeReadBooks (err, user) {
            if (err) {
              return next(err);
            }
            res.json(user.toBeRead);
            res.status(201);
          })
  };
