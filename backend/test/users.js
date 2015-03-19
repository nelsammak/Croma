var request = require('supertest');
var should = require('should');
var setup = require('./setup');


var req = request('http://localhost:8081/api');

describe('User', function() {
    
    beforeEach(setup.clearDB);

    it('Should be created on a post', function(done) {
        req.post('/users')
        .send({
            username: "omar",
            password: "password",
            email: "omar@example.com"
        })
        .end(function(err, res) {
            should.not.exist(err);
            res.status.should.be.eql(201);
            res.body.should.be.an.instanceOf(Object);
            res.body.should.have.properties('username', 'email');
            // res.body.should.not.have.a.property('password');
            done();
        });
    });
});