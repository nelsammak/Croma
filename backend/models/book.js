var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookSchema = new schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	coverLocation: { type: String, required: true },
	bio: { type: String, required: true }
});

bookSchema.set('toJSON', { virtuals: true });

var book = mongoose.model('book', bookSchema);

//removing all books currently in database
book.remove({}, function(err) { 
});
console.log('Current book collection removed');

//inserting books
var book1 = new book({ 
	name: 'Harry Potter and the Philosopher\'s Stone',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/1.jpg',
	bio: '[Insert Bio Here]'
});
book1.save(function (err, book1) {
  if (err) return console.error(err);
});

var book2 = new book({ 
	name: 'Harry Potter and the Chamber of Secrets',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/2.jpg',
	bio: '[Insert Bio Here]'
});
book2.save(function (err, book2) {
  if (err) return console.error(err);
});

var book3 = new book({ 
	name: 'Harry Potter and the Prisoner of Azkaban',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/3.jpg',
	bio: '[Insert Bio Here]'
});
book3.save(function (err, book3) {
  if (err) return console.error(err);
});

var book4 = new book({ 
	name: 'Harry Potter and the Goblet of Fire',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/4.jpg',
	bio: '[Insert Bio Here]'
});
book4.save(function (err, book4) {
  if (err) return console.error(err);
});

var book5 = new book({ 
	name: 'Harry Potter and the Order of the Phoenix',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/5.jpg',
	bio: '[Insert Bio Here]'
});
book5.save(function (err, book5) {
  if (err) return console.error(err);
});

var book6 = new book({ 
	name: 'Harry Potter and the Half-Blood Prince',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/6.jpg',
	bio: '[Insert Bio Here]'
});
book6.save(function (err, book6) {
  if (err) return console.error(err);
});

var book7 = new book({ 
	name: 'Harry Potter and the Deathly Hallows',
	author:'J.K. Rowling',
	coverLocation: 'bookCovers/7.jpg',
	bio: '[Insert Bio Here]'
});
book7.save(function (err, book7) {
  if (err) return console.error(err);
});

console.log('Inserted new book collection into database');