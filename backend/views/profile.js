  var mongoose = require('mongoose'),
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Stashed changes
      Profile = require('../models/user'),
      url = require('url');

module.exports = function(router) {
  
  router.route('/users/:id').get(profile).put(editProfile);
  router.route('/check_username/:username').get(checkUserName);
};
 
  // GET
  var profile = function (req, res, next) {
<<<<<<< Updated upstream
    console.log("Ed5ol fel get isa");
=======
=======
      Profile = require('../models/user')
      url = require('url');
      api = {};

module.exports = function(router) {
  router.route('/users/:id').get(api.profile).put(api.editProfile);
};
 
  // GET
  api.profile = function (req, res, next) {
    console.log("Ed5ol fel get isa");
>>>>>>> parent of cf1654e... Currently reading most probably done but tests needs a little bit of work as I'm trying to login before requesting the book text. #28
>>>>>>> Stashed changes
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

 

  // PUT
  api.editProfile = function (req, res, next) {
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

  helpers.uploadFile(req.files.profilePhoto, function(err, newPhotoName) {
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
        helpers.deletePhoto(user.profilePhoto);
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

  var checkUserName = function checkUserName(req, res, next) {

          User.findOne({username : req.params.username},
           function findUserCallback(err, user) {
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

  var currentlyReadingBooks = function currentlyReadingBooks (req, res, next) {
    var userID = req.params.user;
    User.find({user: userID}).populate(currentlyReading)
          .exec(function userCurrentlyReadingBooks (err, user) {
            if (err) {
              return next(err);
            }
            res.json(user.currentlyReading);
            res.status(201);
          })
  };
