var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/user.js');
var Book = require('../models/book.js');


var req = request('http://localhost:8081/api');

describe('Search', function() {
    
    before(function(done) {
    	User.remove({}, function(err) {
    		console.log(err);
    	});
    	var createUser = new User ({
	      email: "test@test.com",
	      username: "test",
	      password: "test",
	      firstName: "first",
	      lastName: "last",
	      age: 18,
	      address: "address",
	      gender: "male",
    	});
    	createUser.save();
    	Book.remove({}, function(err) {
    		console.log(err);
    	})
    	var createBook = new Book ({
    		name: "testBook",
    		author: "testAuthor",
    		coverLocation: "coverLocation",
    		text: "text"
    	})
    	createBook.save(function () {
    		done();
    	});
    });

      it('Should retrieve all users and books that contains test', function (done) {
        req.get("/search?searchTerm='test'")
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.be.an.instanceOf(Object)
            res.body.should.have.properties('users', 'books');
            res.body.books.should.be.an.instanceOf(Array)
            .and.matchEach(function(it) {
                return it.should.have.properties('name', 'author', 'coverLocation', 'text');
            });
            done();
        })
    })
})