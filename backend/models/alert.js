
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var alertSchema = new Schema({
	type: {type: String , required: true},
	message: {type:String, required: true},
	date: {type: Date, default: Date.now}
});

//include Mongoose virtual fields in toJSON by default
alertSchema.set('toJSON', { virtuals: true });


//exporting the Book model to use it in app.js
module.exports = mongoose.model('alert', alertSchema)