var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    email: { type: String, index: {unique: true}, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;
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