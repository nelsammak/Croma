var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = mongoose.Schema.Types.ObjectId;

var book_reviewSchema = new Schema({
	userId: { type: ObjectId, ref: 'user' },
	bookId: { type: ObjectId, ref: 'book'},
	review: { type: String, required: true },
	upVotes: { type: Number},
	downVotes: { type: Number}
});

book_reviewSchema.index({userId:1, bookId:1});
module.exports = mongoose.model('book_review', book_reviewSchema);