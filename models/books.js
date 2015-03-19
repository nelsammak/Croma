var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
		name: String,
    	author: String,  	
});


booksSchema.set('toJSON', { virtuals: true })

var books = mongoose.model('books',booksSchema);


var book1 = new books({ 
	name: 'Karim',
	author:'Mina' });
	book1.save(function (err, book1) {
  	if (err) return console.error(err);
});

	