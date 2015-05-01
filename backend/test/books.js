var request = require('supertest'),
     should = require('should'),
     setup = require('./setup'),
     Book = require('../models/book.js'),
     User = require('../models/user.js');

var req = request('http://localhost:8081/api');


var testBook;
describe('Books', function() {
    
    before(function (done) {
      Book.findOne({}, function (err, books) {
       if (err) { return done(err) };
        testBook = books;
        console.log(books);
        done();
      });
  });




    it('Should retrieve all books', function (done) {
        req.get('/books')
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.be.an.instanceOf(Array)
            .and.matchEach(function(it) {
                return it.should.have.properties('name', 'author', 'coverLocation', 'bio', 'text');
            });
            done();
        });
    });  

    it('Should retrieve one book', function (done) {
        req.get('/books/' + testBook._id)
        .send({})
        .end(function (err, res) {
            console.log(res.body);
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.have.properties('book')
            .and.matchEach(function(it) {
                return it.should.have.properties('name', 'author', 'coverLocation', 'bio', 'text');
            });
            done();
        })
    })
});