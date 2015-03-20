
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		_= require('lodash'),
		ObjectId = Schema.ObjectId;

var fields = {
	firstName: { type: String },
	lastName: { type: String },
	age: { type: Number },
	address: { type: String },
    profilePhoto: { type: String },
    gender: { type: String, enum: ['male', 'female'] /*, index: true */ }, 
  	user: { type: ObjectId, ref: 'userSchema' },
};
userSchema.pre('save', function(next) {
// Initial update user avatar based on gender
if (_.isUndefined(this.profilePhoto) || _.isEmpty(this.profilePhoto) || this.profilePhoto === 'male_avatar.png' || this.profilePhoto === 'female_avatar.png' || this.profilePhoto === 'default_avatar.png') {
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
next();
});


var profileSchema = new Schema(fields);

module.exports = mongoose.model('Profile', profileSchema);
