var request = require('supertest'),
   should = require('should'),
   setup = require('./setup'),
   User = require('../models/user');


var req = request('http://localhost:8081/api');

describe('Profile', function() {
    
    var postUser = {
            username: "test",
            password: "test",
            email: "test@test.com",
            firstName: 'test',
            lastName: 'user',
            age: '20',
            address: 'address of user',
            gender: 'male'
        }
    before(setup.clearDB);

    it('Should be created on a post', function(done) {
        req.post('/users')
        .send(postUser)
        .end(function(err, res) {
            should.not.exist(err);
            res.status.should.be.eql(201);
            res.body.should.be.an.instanceOf(Object);
            res.body.should.have.properties('username', 'email', 'firstName', 'lastName', 'age', 'address', 'gender');
            done();
        });
    });

    it('Should retrieve all profiles', function (done) {
        req.get('/users')
        .send({})
        .end(function (err, res) {
            should.not.exist(err);
            res.status.should.be.eql(201);
            console.log(res.body);
            res.body.should.be.an.instanceOf(Array)
            .and.matchEach(function(it) {
                return it.should.have.properties('username', 'email', 'firstName', 'lastName', 'age', 'address', 'gender');
            });
            done();
        })
    })
  it('Should get one user', function (done) {
      User.findOne({email: 'test@test.com'}, function (err, tempUser) {
              req.get('/users/' + tempUser._id)
              .send({})
              .end(function (err, res) {
                  console.log(res.error);
                  console.log('EL BODY AHO', res.body);
                  console.log('EL ERROR AHO', res.err);
                  should.not.exist(err);
                  res.status.should.be.eql(200);
                  console.log(res.body);
                  res.body.should.be.an.instanceOf(Object)
                  .and.matchEach(function(it) {
                      return it.should.have.properties('username', 'email', 'firstName', 'lastName', 'age', 'address', 'gender');
                  });
                  done();
              })
            })
     })
});