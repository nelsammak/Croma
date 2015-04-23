var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.types.ObjectId;

var book_reviewSchema = new Schema({
	userId: { type: ObjectId, ref: 'user' },
	bookId: { type: ObjectId, ref: 'book'},
	body: { type: String, required: true },
	upVotes: { type: Number},
	downVotes: { type: Number}
});

module.exports = mongoose.model('book_review', book_reviewSchema);