var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/user.js');
var Book = require('../models/book.js');

var req = request.agent('http://localhost:8081/api');

var testBook;

describe('ReadBook', function () {
  
  before(function (done) {
      
      var post = {
       email: 'test@test.com',
       password: 'test',
       username: 'test'
     };

     /*User.create(post, function (err, testUser) {
       if (err) { return done(err) };
        console.log('Created User', testUser);
     */ 
        Book.findOne({}, function (err, books) {
         if (err) { return done(err) };
          console.log(books._id);
          testBook = books;
          done();
        // });
      });
  });

  it('Should send 7aga bas lesa', function (done) {
     var post = {
       email: 'test@test.com',
       password: 'test',
       username: 'test'
     };
    Book.findOne({}, function (err, book) {
      console.log('found this book', book);
      req.post('/sessions').send(post).end(function (error, response) {
        console.log('RESPONSE EL FOO2' , response.body);
      req.post('/books/' + testBook._id).send({}).end(function (err, res) {
      if (err) {
        done(err);
      }
      console.log('RESPONSE ', res.body);
      // res.status.should.be.equal(200);
      res.body.should.have.properties('text');        
      done();
      });
      });  
    });
  });

});