var mongoose = require('mongoose'),
Book = require('./book.js'),
User = require('./user.js'),
Schema = mongoose.Schema,
ObjectId = mongoose.Schema.Types.ObjectId;

var book_reviewSchema = new Schema({
	userId: { type: ObjectId, ref: 'user' },
	bookId: { type: ObjectId, ref: 'book'},
	review: { type: String, required: true },
	upVotes: { type: ObjectId, ref: 'user' },
	downVotes: { type: ObjectId, ref: 'user'}
});

book_reviewSchema.index({userId:1, bookId:1});
module.exports = mongoose.model('book_review', book_reviewSchema);