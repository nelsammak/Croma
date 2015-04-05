  var mongoose = require('mongoose'),
      Profile = require('../models/user'),
      im = require('imagemagick'),
      util = require('util'),
      fs = require('fs'),
      _= require('lodash');
      url = require('url');

module.exports = function(router) {  
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
        res.json({profile: profile});
      }
    });
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
        if (newPhotoName   false) {
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
