var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var Book = require('../models/book.js');
var User = require('../models/user.js');

var req = request('http://localhost:8081/api');

describe('DeleteBooks', function() {

var testBook;
	before(setup.clearDB);

	before(function(done) {
		var book = new Book({
			name: 'Harry Potter and the Philosopher\'s Stone',
			author: 'J.K. Rowling',
			coverLocation: 'books/bookCovers/1.jpg',
			bio: '"Harry Potter has never played a sport while flying on a broomstick. He\'s never worn a Cloak of Invisibility, befriended a giant, or helped hatch a dragon. All Harry knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley. Harry\'s room is a tiny cupboard under the stairs, and he hasn\'t had a birthday party in ten years.<br><br>But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to a wonderful place he never dreamed existed. There he finds not only friends, aerial sports, and magic around every corner, but a great destiny that\'s been waiting for him... if Harry can survive the encounter."<br><br>"Till now there\'s been no magic for Harry Potter. He lives with the miserable Dursleys and their abominable son, Dudley. Harry\'s room is a tiny closet beneath the stairs, and he hasn\'t had a birthday party in eleven years.<br><br>But then a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place called Hogwarts School of Witchcraft and Wizardry. And there he finds not only friends, flying sports on broomsticks, and magic in everything from classes to meals, but a great destiny that\'s been waiting for him... if Harry can survive the encounter."<br><br>"Harry Potter thinks he is an ordinary boy - until he is rescued by a beetle-eyed giant of a man, enrolls at Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason: Harry Potter IS A WIZARD!"',
			text: 'books/bookEpub/orwell-animal-farm.epub',
			genres: ['Crime', 'Romance'],
			ratings: [],
			arrivalTime: new Date("September 13, 2014 17:30:00")
		});

		book.save(function func(err, book) {
			if (err) return console.error(err);
			testBook = book;
			done();
		});
	})


	it('Should Delete all books', function (done) {
        req.delete('/books/' + testBook._id)
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.have.properties('books');
            done();
        });
    });  
});
