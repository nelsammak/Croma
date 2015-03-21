var request = require('supertest');
var should = require('should');
var setup = require('./setup');


var req = request('http://localhost:8081/api');

describe('User', function() {
    
    before(setup.clearDB);

    it('Should be created on a post', function(done) {
        req.post('/users')
        .send({
            username: "test2",
            password: "test2",
            email: "test2@example.com"
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

    it('Should retrieve all users', function (done) {
        req.get('/users')
        .send({})
        .end(function (err, res) {
            console.log('All users ahom' ,res.body);
            should.not.exist(err);
            res.status.should.be.eql(200);
            res.body.should.be.an.instanceOf(Array)
            .and.matchEach(function(it) {
                return it.should.have.properties('username', 'email');
            });
            done();
        })
    })
});