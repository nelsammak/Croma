module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Profile = mongoose.models.Profile,
      api = {};

 
  // GEt
  api.profile = function (req, res) {
    var id = req.params.id;
    Profile.findOne({ '_id': id }, function(err, profile) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({profile: profile});
      }
    });
  };

 

  // PUT
  api.editProfile = function (req, res) {
    var id = req.params.id;

    Profile.findById(id, function (err, profile) {


    
      if(typeof req.body.profile["name"] != 'undefined'){
        profile["name"] = req.body.profile["name"];
      }  
    
      if(typeof req.body.profile["last_name"] != 'undefined'){
        profile["last_name"] = req.body.profile["last_name"];
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
if (!_.isUndefined(req.files) && !_.isUndefined(req.files.profilePhoto)) {
// Upload the image file
console.log('To upload file');
console.log(req.files);
helpers.uploadFile(req.files.profilePhoto, function(err, newPhotoName) {
// If file type check fails
if (newPhotoName === false) {
// Return the error message
return res.json({
status: 0,
error: {
type: err.type,
message: err.message
}
});
}
// If there is error saving the file
if (err) {
return res.json({
status: 0,
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
        } else {
         return res.json(500, err);
        }
        return res.json({profile: profile});
      });
    });

  };




 



  app.get('/api/profiles/:id', api.profile);
  app.put('/api/profiles/:id', api.editProfile);
};
