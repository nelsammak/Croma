var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var books = new Schema({
		name: String,
    	author: String,
    	genre :String,
    	description :String,
    	imagelocation:String
})

mongoose.Schema = ('books',books);