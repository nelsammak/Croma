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

/**
 * @function removeFromCurrentlyReading
 * Removes from currently reading of users after removing a book
 * @param  {function} next - next middleware
 */
bookSchema.pre('remove', function removeFromCurrentlyReading (next) {
	User.findOneAndUpdate({'currentlyReading': this._id},
	 {$pull: {'currentlyReading': this._id}}, function currentlyReadingCallBack(err, user) {
		if (err) {
			next(err);
		}
		console.log('USER AFTER currently reading DELETION OF BOOK WITH ID ' , this._id, ':', user);
		next();
	});	
})

/**
 * @function removeFromToBeRead
 * Removes from to be read of users after removing a book
 * @param  {function} next - next middleware
 */
bookSchema.pre('remove', function removeFromToBeRead (next) {
	User.findOneAndUpdate({'toBeRead': this._id},
	 {$pull: {'toBeRead': this._id}}, function toBeReadCallBack(err, user) {
		if (err) {
			next(err);
		}
		console.log('USER AFTER to be read DELETION OF BOOK WITH ID ' , this._id, ':', user);
		next();
	});
})

/**
 * @function removeFromRead
 * Removes from already read of users after removing a book
 * @param  {function} next - next middleware
 */
bookSchema.pre('remove', function removeFromRead (next) {
	User.findOneAndUpdate({'read': this._id},
	 {$pull: {'read': this._id}}, function readCallBack(err, user) {
		if (err) {
			next(err);
		}
		console.log('USER AFTER read DELETION OF BOOK WITH ID ' , this._id, ':', user);
		next();
	});
})



//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });


//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)

