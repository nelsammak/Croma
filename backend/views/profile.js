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
  router.route('/users/:id').get(profile).post(editProfile);
  router.route('/check_username/:username').get(checkUserName);
};
 

exports.uploadFile = function(file, callback) {
  var tmpPath = file.path
    , oldName = file.name
    , extension, newName, newPath;

  // get the extension of the file
  extension = oldName.substr(oldName.lastIndexOf('.'));

  // Check file type
  var allowed_extensions = ['.gif', '.GIF', '.png', '.jpeg', '.jpg', '.JPG', '.JPEG'];
  if (!_.contains(allowed_extensions, extension)) {
    var err = {
      type: 'extension',
    };

    return callback(err, false);
  }

  // Create the newName by hashing the file path
  newName = crypto.createHash('md5').update(tmpPath).digest('hex') + extension;

  // Create the path for upload image
  if (process.env.NODE_ENV === 'production') {
    newPath = './public/' + newName;    
  } else {
    newPath = './public/images/' + newName;
  }

  // resize and move the image
  im.resize({
    srcPath: tmpPath,
    dstPath: newPath,
    width: 300
  }, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
    callback(err, newName);
  });
};

// Middle ware to delete the profile photo
exports.deletePhoto = function(profilePhoto) {
  var defaultPhotos = ['male_avatar.png', 'female_avatar.png', 'default_avatar.png'];
  // If profile photo of this user is a default one do nothing
  if (_.indexOf(defaultPhotos, profilePhoto) !== -1) {
    return;
  }

  var photoPath;
  // Create the photo path according to environment
  if (process.env.NODE_ENV === 'production') {
    photoPath = './public/';      
  } else {
    photoPath = './public/images/';
  }
  // Delete the photo
  fs.unlink(photoPath + profilePhoto, function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Successfully delete the profile Photo');
  });
};

// GET
  var profile = function (req, res, next) {
    var id = req.params.id;
    Profile.findOne({ '_id': id }, function(err, profile) {
      if (err) {
       return next(err);
      } else {
        console.log(profile);
        res.json({profile: profile});
      }
    });
  };

 

/**
* @function editProfile - Called on GET "/api/users/:id"
* edit user info in the database and save
* @param {Object} req - Http request
* @param {Object} res - Http response
* @param {Object} next - Next middleware
*/
    var editProfile = function (req, res, next) {
    //console.log('response is',req.body);
    console.log('info ',req.body);
    var id = req.params.id;
     // var id = user.id;
        Profile.findById(id, function(err, Profile) {
        if (err) throw err;

          // change the users info
          Profile.firstName = req.body.firstName;
          Profile.lastName = req.body.lastName;
          Profile.age = req.body.age;
          Profile.address = req.body.address;

          // save the user
          Profile.save(function(err) {
            if (err) throw err;

            console.log('User successfully updated!');
          });

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
