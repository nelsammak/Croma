var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookSchema = new schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	coverLocation: { type: String, required: true },
	bio: { type: String, required: true },
	ratings: Array,
	arrivalTime: { type: Date, default: Date.now }
});

//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });

//saving the Mongoose model in a variable
var book = mongoose.model('book', bookSchema);

//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)
