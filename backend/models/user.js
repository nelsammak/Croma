var mongoose = require('mongoose');
    bcrypt = require('bcrypt'),
    SALT_FACTOR = 10,
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    Book = require('./book.js'),
    _= require('lodash');

var UserSchema = new Schema({
    email: { type: String, index: {unique: true}, required: true},
    username: { type: String, required: true, unique: true, index: true},
    password: { type: String, required: true },
    firstName: { type: String, index:true },
    lastName: { type: String,  index:true },
    age: { type: Number },
    admin: {type: Boolean },
    address: { type: String },
    profilePhoto: { type: String },
    gender: { type: String, enum: ['male', 'female']},
    currentlyReading: [{type: ObjectId, ref: 'book'}],
    read: [{type:ObjectId, ref: 'book'}],
    bookClubs: {type: Array, default: []},
    toBeRead: [{type:ObjectId, ref: 'book'}],
    invites: {type: Array, default: []}
});

UserSchema.pre('save', function(next) {
    var user = this;
    // Initial update user avatar based on gender
  if (_.isUndefined(this.profilePhoto) 
     || _.isEmpty(this.profilePhoto) 
     || this.profilePhoto === '/img/male_avatar.png' 
     || this.profilePhoto === '/img/female_avatar.png' 
     || this.profilePhoto === '/image/avatar.png') {
        if (_.isUndefined(this.gender)) {
        this.profilePhoto = '/image/avatar.png';
        }
        if (this.gender === 'male') {
        this.profilePhoto = '/img/male_avatar.png';
        }
        if (this.gender === 'female') {
        this.profilePhoto = '/img/female_avatar.png';
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
 
module.exports = mongoose.model('user', UserSchema);