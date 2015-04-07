var Books = require('../models/book.js');

//removing all books currently in database
Books.remove({}, function error (err) {
});
console.log('Current book collection removed');

//inserting books by creating an object using the Book schema and then saving it in the database
var book1 = new Books({
  name: 'Harry Potter and the Philosopher\'s Stone',
  author:'J.K. Rowling',
  coverLocation: 'books/bookCovers/1.jpg',
  bio: '"Harry Potter has never played a sport while flying on a broomstick. He\'s never worn a Cloak of Invisibility, befriended a giant, or helped hatch a dragon. All Harry knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley. Harry\'s room is a tiny cupboard under the stairs, and he hasn\'t had a birthday party in ten years.<br><br>But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to a wonderful place he never dreamed existed. There he finds not only friends, aerial sports, and magic around every corner, but a great destiny that\'s been waiting for him... if Harry can survive the encounter."<br><br>"Till now there\'s been no magic for Harry Potter. He lives with the miserable Dursleys and their abominable son, Dudley. Harry\'s room is a tiny closet beneath the stairs, and he hasn\'t had a birthday party in eleven years.<br><br>But then a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place called Hogwarts School of Witchcraft and Wizardry. And there he finds not only friends, flying sports on broomsticks, and magic in everything from classes to meals, but a great destiny that\'s been waiting for him... if Harry can survive the encounter."<br><br>"Harry Potter thinks he is an ordinary boy - until he is rescued by a beetle-eyed giant of a man, enrolls at Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason: Harry Potter IS A WIZARD!"',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("September 13, 2014 17:30:00")

});

book1.save(function func (err, book1) {
  if (err) return console.error(err);
});

var book2 = new Books({
  name: 'Harry Potter and the Chamber of Secrets',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/2.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("September 13, 2014 17:35:00")
});
book2.save(function func (err, book2) {
  if (err) return console.error(err);
});

var book3 = new Books({
  name: 'Harry Potter and the Prisoner of Azkaban',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/3.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("November 2, 2014 10:06:00")
});
book3.save(function func (err, book3) {
  if (err) return console.error(err);
});

var book4 = new Books({
  name: 'Harry Potter and the Goblet of Fire',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/4.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("November 3, 2014 22:10:00")
});
book4.save(function func (err, book4) {
  if (err) return console.error(err);
});

var book5 = new Books({
  name: 'Harry Potter and the Order of the Phoenix',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/5.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("November 29, 2014 15:27:00")
});
book5.save(function func (err, book5) {
  if (err) return console.error(err);
});

var book6 = new Books({
  name: 'Harry Potter and the Half-Blood Prince',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/6.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("December 5, 2014 13:59:00")
});
book6.save(function func (err, book6) {
  if (err) return console.error(err);
});

var book7 = new Books({
  name: 'Harry Potter and the Deathly Hallows',
  author:'J.K. Rowling',
  coverLocation: '/books/bookCovers/7.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
	 	    In lobortis nunc sodales odio scelerisque, et eleifend velit\
	  		fringilla. Sed luctus lorem vitae sapien cursus posuere.\
	   		Nunc ultrices fermentum pulvinar. Etiam consequat,\
	   		velit sed tincidunt euismod, dolor leo pharetra nunc,\
	   		sed venenatis leo massa sit amet justo.\
	   		Vestibulum eu consectetur est.\
	   		In hac habitasse platea dictumst. \
	   		Sed in rutrum dolor, at euismod sapien. \
	   		Nulla a lectus volutpat, sagittis sem at, pharetra diam. \
	   		Suspendisse interdum lorem lectus, in pulvinar quam congue eget. \
	   		Vivamus elementum eu odio laoreet condimentum.',
  text: 'books/bookEpub/orwell-animal-farm.epub',
  ratings: [],
	arrivalTime: new Date("January 3, 2015 8:00:00")
});
book7.save(function func (err, book7) {
  if (err) return console.error(err);
});

console.log('Inserted new book collection into database');