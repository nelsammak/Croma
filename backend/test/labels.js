var request = require('supertest'),
     should = require('should'),
     setup = require('./setup'),
     Book = require('../models/book.js'),
     User = require('../models/user.js');

var req = request('http://localhost:8081/api');


var testBook;
describe('Labels', function() {
    
    before(function (done) {
      Book.findOne({}, function (err, book) {
       if (err) { return done(err) };
        testBook = book;
        console.log(book);
        done();
      });
  });

    it('Should retrieve labels of a book', function (done) {
        req.get('/books/' + testBook._id + '/labels')
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.be.an.instanceOf(Object)
            res.body.should.have.properties('book')
            done();
        });
    });  

    it('Should retrieve one book', function (done) {
        req.post('/books/' + testBook._id + '/labels')
        .send({labels : ['New Arrival', 'Best Seller']})
        .end(function (err, res) {
            console.log(res.body);
            should.not.exist(err);
            res.status.should.be.eql(201);
            res.body.should.have.properties('book')
            .and.matchEach(function(it) {
                return it.should.have.properties('name', 'author', 'coverLocation', 'bio', 'text', 'labels');
            });
            done();
        })
    })

    it('Should retrieve labels', function (done) {
        req.get('/labels')
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.be.an.instanceOf(Array)
            done();
        });
    });  
});