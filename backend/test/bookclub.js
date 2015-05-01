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
      toBeRead: [],
      bookClubs: []
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
    it('should create a book club', function(done) {
      var body = {
        userId: user1._id.toString(),
        title: 'Test Book Club'
      };
      request(url)
        .post('/api/bookclubs/createbookclub')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.equal("Created the Book Club Successfully");
          done();
        });
    });
    it('should view the book club', function(done) {
      var body = {
        userId: user1._id.toString()
      };
      request(url)
        .post('/api/bookclubs')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body[0].name.should.equal('Test Book Club');
          res.body[0].creator.should.equal(userId);
          done();
        });
    });
  });
});