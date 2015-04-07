var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookSchema = new Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	coverLocation: { type: String, required: true },
	bio: { type: String, required: true },
	genres: [String],
	ratings: { type: [Schema.Types.Mixed], default: []},
	arrivalTime: { type: Date, default: Date.now }
});

//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });

//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)
