var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var book_reviewSchema = new Schema({
	
	body: { type: String, required: true },
	upVotes: { type: Number},
	downVotes: { type: Number}
})