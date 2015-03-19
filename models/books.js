var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
		name: String,
    	author: String,
    	
});


booksSchema.set('toJSON', { virtuals: true })

mongoose.model('books',booksSchema);
