var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
 	User = require('./user.js'),
 	Book = require('./book.js'),
	findOrCreate = require('mongoose-findorcreate'),
 	ObjectId = Schema.ObjectId;


var userBook = new schema({
	user: {
		type: ObjectId,
		ref: User
	}
	book: {
		type: ObjectId,
		ref: Book
	}
	reading: Boolean
})

userBook.plugin(findOrCreate);
