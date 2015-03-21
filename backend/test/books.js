var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var Books = require('../models/book');

var req = request('http://localhost:8081/api');

describe('Books', function() {
    
    it('Should retrieve all books', function (done) {
        req.get('/books')
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(201);
            console.log(res.body);
            res.body.should.be.an.instanceOf(Array)
            .and.matchEach(function(it) {
                return it.should.have.properties('name', 'author', 'coverLocation', 'bio');
            });
            done();
        })
    })
      
  it('Should get one book', function (done) {
      Books.findOne({name: 'Harry Potter and the Goblet of Fire'}, function (err, tempBook) {
              req.get('/books/' + tempBook._id)
              .send({})
              .end(function (err, res) {
                  console.log(res.error);
                  console.log('EL BODY AHO', res.body);
                  console.log('EL ERROR AHO', res.err);
                  should.not.exist(err);
                  res.status.should.be.eql(200);
                  console.log(res.body);
                  res.body.should.be.an.instanceOf(Array)
                  .and.matchEach(function(it) {
                      return it.should.have.properties('name', 'author', 'coverLocation', 'bio');
                  });
                  done();
              })
            })
     })
});