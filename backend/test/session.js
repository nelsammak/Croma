var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/user.js');

var req = request.agent('http://localhost:8081/api');



describe('Session', function () {
  
  before(function (done) {
    var dummyDone = function () {
      var testUser = {
        password: 'test',
        email: 'test@test.com',
        username: 'test'
      }
      User.create(testUser, function (err, testUser) {
       if (err) { return done(err) };
        done();
      });
    };
    setup.clearDB(dummyDone);
  });

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
   
    it('Should send status 200 after logout'
    , function (done) {
     var post = {
      email: 'test@test.com',
      password: 'test'
     };

    req.post('/sessions').send(post)
    req.delete('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(204);
         done();
       }); 
    });
    
    it('Should send "Email is not registered." error json after incorrect email login'
      , function (done){
        var post = {
          email: 'WrongEmail@test.com',
          password: 'WrongPassword'
        }
        req.post('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(400);
         res.body.should.be.an.instanceOf(Object);
         res.body.should.have.properties('errors');
         res.body.errors.should.have.properties('email');
         res.body.errors.email.should.have.properties('type');
         res.body.errors.email.type.should.be.eql('Email is not registered.');
         done();
       });
      })

      it('Should send "Password is incorrect." error json after incorrect password login'
      , function (done){
        var post = {
          email: 'test@test.com',
          password: 'WrongPassword'
        }
        req.post('/sessions')
       .send(post)
       .end(function (err, res) {
         should.not.exist(err);
         res.status.should.be.eql(400);
         res.body.should.be.an.instanceOf(Object);
         res.body.should.have.properties('errors');
         res.body.errors.should.have.properties('password');
         res.body.errors.password.should.have.properties('type');
         res.body.errors.password.type.should.be.eql('Password is incorrect.');         
         done();
       });
      })
    
});
