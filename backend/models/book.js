var mongoose = require('mongoose'),
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
	ratingsSum: { type: Number, default: 0},
	ratingsNum: { type: Number, default: 0},
	avgRating: { type: Number, default: 0},
	arrivalTime: { type: Date, default: Date.now}
});

//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });

//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)
