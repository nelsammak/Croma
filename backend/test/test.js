var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var User = require('../models/user');
var Books = require('../models/book');

describe('Routing', function() {
  var url = 'localhost:8081';
  // all the operations that are needed to setup the tests.
  before(function(done) {
    User.remove({}, function error (err) {
    });
     user1 = new User ({
      email: "supermimi@gmail.com",
      username: "mimi",
      password: "$2a$10$/jR0tK67zTM0xUYg6vjhDOBN2iqfRjSW5vHDk0czhfwwrErfRbcwm",
      firstName: "Mohamed",
      lastName: "El Sayed",
      age: 18,
      address: "Shobra",
      profilePhoto: "default_avatar.png",
      gender: "male",
      toBeRead: []
    });
    user1.save();

    user2 = new User ({
      email: "superH@gmail.com",
      username: "Hesham",
      password: "$2a$10$/jR0tK67zTM0xUYg6vjhDOBN2iqfRjSW5vHDk0czhfwwrErfRbcwm",
      firstName: "Hesham",
      lastName: "El Ot",
      age: 16,
      address: "Shobra",
      profilePhoto: "default_avatar.png",
      gender: "male",
      toBeRead: []
    });
    user2.save();

    books = [];
    done();
  });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('Books', function() {
    it('should return all books', function(done) {
      request(url)
        .get('/api/books')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.length.should.equal(7);
          books = res.body;
          done();
        });
    });
    it('should return the new arrivals', function(done) {
      request(url)
        .get('/api/newarrivals')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.length.should.equal(5);
          res.body[0].name.should.equal("Harry Potter and the Deathly Hallows");
          res.body[1].name.should.equal("Harry Potter and the Half-Blood Prince");
          res.body[2].name.should.equal("Harry Potter and the Order of the Phoenix");
          done();
        });
    });
    it('should return the books of the genre Crime', function(done) {
      request(url)
        .get('/api/genre/Crime')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          var areAllBooksOfCrimeGenre = true;
          for (var i = 0; i < res.body.length; i++) {
            if (res.body[i].genres.indexOf('Crime') < 0) {
              areAllBooksOfCrimeGenre = false;
              break;
            }
          }
          res.body.length.should.equal(2);
          areAllBooksOfCrimeGenre.should.equal(true);
          done();
        });
    });
    it('should rate the book', function(done) {
      var body = {
        userId: user1._id.toString(),
        rating: 4
      };
      request(url)
        .post('/api/books/' + books[0]._id + '/rate')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('the rating should be updated', function(done) {
      request(url).get('/api/books')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          books = res.body;
          books[0].ratings[0].id.should.equal(user1._id.toString());
          books[0].ratings[0]['rating'].should.equal(String(4));
          done();
        });
    });
  });
});