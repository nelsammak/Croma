var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _= require('lodash');

var UserSchema = new Schema({
    email: { type: String, index: {unique: true}, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    address: { type: String },
    profilePhoto: { type: String },
    gender: { type: String, enum: ['male', 'female'], index: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // Initial update user avatar based on gender
  if (_.isUndefined(this.profilePhoto) 
     || _.isEmpty(this.profilePhoto) 
     || this.profilePhoto === 'male_avatar.png' 
     || this.profilePhoto === 'female_avatar.png' 
     || this.profilePhoto === 'default_avatar.png') {
        if (_.isUndefined(this.gender)) {
        this.profilePhoto = 'default_avatar.png';
        }
        if (this.gender === 'male') {
        this.profilePhoto = 'male_avatar.png';
        }
        if (this.gender === 'female') {
        this.profilePhoto = 'female_avatar.png';
        }
     }
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

/*Virtual to get info */
UserSchema
  .virtual('user_info')
  .get(function () {
    return { '_id': this._id, 'username': this.username, 'email': this.email };
  });


/*Instance methods*/
UserSchema.methods.verifyPassword = function(candidate, callback) {
    bcrypt.compare(candidate, this.password, function(err, isMatch) {
        if (err) {
            callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);