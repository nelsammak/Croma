var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookSchema = new schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	coverLocation: { type: String, required: true },
	bio: { type: String, required: true }
});

//include Mongoose virtual fields in toJSON by default
bookSchema.set('toJSON', { virtuals: true });

//saving the Mongoose model in a variable
var book = mongoose.model('book', bookSchema);

//removing all books currently in database
book.remove({}, function error (err) { 
});
console.log('Current book collection removed');

//inserting books by creating an object using the Book schema and then saving it in the database
var book1 = new book({ 
	name: 'Harry Potter and the Philosopher\'s Stone',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/1.jpg',
	bio: '[Insert Bio Here]'
});
book1.save(function func (err, book1) {
  if (err) return console.error(err);
});

var book2 = new book({ 
	name: 'Harry Potter and the Chamber of Secrets',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/2.jpg',
	bio: '[Insert Bio Here]'
});
book2.save(function func (err, book2) {
  if (err) return console.error(err);
});

var book3 = new book({ 
	name: 'Harry Potter and the Prisoner of Azkaban',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/3.jpg',
	bio: '[Insert Bio Here]'
});
book3.save(function func (err, book3) {
  if (err) return console.error(err);
});

var book4 = new book({ 
	name: 'Harry Potter and the Goblet of Fire',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/4.jpg',
	bio: '[Insert Bio Here]'
});
book4.save(function func (err, book4) {
  if (err) return console.error(err);
});

var book5 = new book({ 
	name: 'Harry Potter and the Order of the Phoenix',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/5.jpg',
	bio: '[Insert Bio Here]'
});
book5.save(function func (err, book5) {
  if (err) return console.error(err);
});

var book6 = new book({ 
	name: 'Harry Potter and the Half-Blood Prince',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/6.jpg',
	bio: '[Insert Bio Here]'
});
book6.save(function func (err, book6) {
  if (err) return console.error(err);
});

var book7 = new book({ 
	name: 'Harry Potter and the Deathly Hallows',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/7.jpg',
	bio: '[Insert Bio Here]'
});
book7.save(function func (err, book7) {
  if (err) return console.error(err);
});

//exporting the Book model to use it in app.js
module.exports = mongoose.model('book', bookSchema)

console.log('Inserted new book collection into database');