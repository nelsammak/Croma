var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/user.js');

var req = request('http://localhost:8081/api');

beforeEach(function (done) {
     var testUser = {
       email: 'test@test.com',
       password: 'test',
       username: 'test'
   }
     User.create(testUser, function (err, testUser) {
       done();
     });
 });

describe('Session', function () {
   it('Should send User object after login', function (done) {
     var post = {
       email: 'test2@example.com',
       password: 'test2',
	   username: 'test2'
     };
     User.find({}, function (err, users) {
     	console.log('All available users: ', users);
     })
    req.post('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(200);
         res.body.should.be.an.instanceOf(Object);
         res.body.should.have.properties('username', 'email');
         done();
       });
   });
   
   it('Should send User object after logout', function (done) {
     var post = {
       email: 'test2@example.com',
       password: 'test2',
	   username: 'test2'
     };
     User.find({}, function (err, users) {
     	console.log('All available users: ', users);
     })
    req.delete('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(200);
         res.body.should.be.an.instanceOf(Object);
         res.body.should.have.properties('username', 'email');
         done();
       });
   });
  });
