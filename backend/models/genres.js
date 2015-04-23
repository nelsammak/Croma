var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating the Genre Schema, the schema takes a JSON of the attributes of the Genres Schema
var genresSchema = new Schema({
	name: { type: String, required: true }
});

//include Mongoose virtual fields in toJSON by default
genresSchema.set('toJSON', { virtuals: true });


//exporting the Book model to use it in app.js
module.exports = mongoose.model('genres', genresSchema)
