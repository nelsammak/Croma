var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
 	User = require('./user.js'),
 	Book = require('./book.js'),
	findOrCreate = require('mongoose-findorcreate'),
 	ObjectId = Schema.ObjectId;


var userBook = new Schema({
	user: {
		type: ObjectId,
		ref: User,
		required: true,
		index: true
	},
	book: {
		type: ObjectId,
		ref: Book,
		required: true
	},
	reading: Boolean
})

userBook.plugin(findOrCreate);

module.exports = mongoose.model('UserBook', userBook);