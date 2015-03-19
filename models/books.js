var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
		name: String,
    	author: String,
    	genre :String,
    	description :String,
    	imagelocation:String
})

mongoose.Schema = ('books',booksSchema)