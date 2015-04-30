var mongoose = require('mongoose'),
	 User = require('../models/user.js'),
	 async = require('async'),
	 fs = require('fs'),
	 path = require('path'),
	 Schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookSchema = new Schema({
	name: { type: String, required: true, index: true },
	author: { type: String, required: true, index: true },
	coverLocation: { type: String, required: true },
	bio: { type: String },
	text: { type: String, required: true},
	labels: [{ type: String }],
	genres: [{type: String, index: true }],
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
		next();
	});
})

/**
 * @function removeCoverAndEpub
 * Removes cover image and epub file from file system after removing a book
 * @param  {function} next - next middleware
 */
bookSchema.pre('remove', function removeCoverAndEpub (next) {
	var coverLocation = path.join(__dirname, '../../frontend', this.coverLocation),
	text = path.join(__dirname, '../../frontend', this.text);

	async.parallel ({
		cover: function (cb) {
			fs.unlink(coverLocation, cb);
		},
		text : function (cb) {
			fs.unlink(text, cb)
		}
	}, function(err) {
		if (err) {
			next(err)
		}
		console.log('Removed cover and epub successfully');
	})
})



//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });



//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)

