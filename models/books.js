var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
	name: String,
	author: String,
	coverLocation: String
});


booksSchema.set('toJSON', { virtuals: true });

var books = mongoose.model('books',booksSchema);

//inserting books
var book1 = new books({ 
	name: 'Harry Potter and the Philosopher\'s Stone',
	author:'J.K. Rowling',
	coverLocation: 'assets/1.jpg'
});
book1.save(function (err, book1) {
  if (err) return console.error(err);
});

var book2 = new books({ 
	name: 'Harry Potter and the Chamber of Secrets',
	author:'J.K. Rowling',
	coverLocation: 'assets/2.jpg'
});
book2.save(function (err, book2) {
  if (err) return console.error(err);
});

var book3 = new books({ 
	name: 'Harry Potter and the Prisoner of Azkaban',
	author:'J.K. Rowling',
	coverLocation: 'assets/3.jpg'
});
book3.save(function (err, book3) {
  if (err) return console.error(err);
});

var book4 = new books({ 
	name: 'Harry Potter and the Goblet of Fire',
	author:'J.K. Rowling',
	coverLocation: 'assets/4.jpg'
});
book4.save(function (err, book4) {
  if (err) return console.error(err);
});

var book5 = new books({ 
	name: 'Harry Potter and the Order of the Phoenix',
	author:'J.K. Rowling',
	coverLocation: 'assets/5.jpg'
});
book5.save(function (err, book5) {
  if (err) return console.error(err);
});

var book6 = new books({ 
	name: 'Harry Potter and the Half-Blood Prince',
	author:'J.K. Rowling',
	coverLocation: 'assets/6.jpg'
});
book6.save(function (err, book6) {
  if (err) return console.error(err);
});

var book7 = new books({ 
	name: 'Harry Potter and the Deathly Hallows',
	author:'Joanne Kathleen Rowling',
	coverLocation: 'assets/7.jpg'
});
book7.save(function (err, book7) {
  if (err) return console.error(err);
});