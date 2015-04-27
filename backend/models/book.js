var mongoose = require('mongoose');
var User = require('../models/user.js');
var async = require('async');
var Schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookSchema = new Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	coverLocation: { type: String, required: true },
	bio: { type: String},
	text: { type: String, required: true},
	labels: [{ type: String }],
	genres: [String],
	ratings: { type: [Schema.Types.Mixed], default: []},
	arrivalTime: { type: Date, default: Date.now}
});

bookSchema.pre('remove', function pullFromShelves (next) {
	console.log('POSTREMOVE HOOOK', this._id);

	User.findOneAndUpdate({'currentlyReading': this._id},
	 {$pull: {'currentlyReading': this._id}}, function currentlyReadingCallBack(err, user) {
		if (err) {
			next(err);
		}
		console.log('USER AFTER DELETION OF BOOK WITH ID ' , this._id, ':', user);
	});
	
})

//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });


//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)

