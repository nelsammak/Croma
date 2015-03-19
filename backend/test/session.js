var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/user.js');

var req = request.agent('http://localhost:8081/api');



describe('Session', function () {
  
  beforeEach(function (done) {
    setup.clearDB(function  () {
       var testUser = {
         password: 'test',
         email: 'test@test.com',
         username: 'test'
       }
       User.create(testUser, function (err, testUser) {
        console.log('This is error', err);
        if (err) { return done(err) };
         done();
       });
    })
  });

  afterEach( function (done) {
    User.remove({});
    done();
  })

   it('Should send User object after login', function (done) {
     var post = {
       email: 'test@test.com',
       password: 'test',
	     username: 'test'
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
   
    it('Should send User object after logout'
    , function (done) {
     var post = {
      email: 'test@test.com',
      password: 'test',
      username: 'test'
     };

    req.post('/sessions').send(post)
    req.delete('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(200);
         done();
       });
   });

  });
