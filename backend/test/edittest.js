var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var setup = require('./setup');
var User = require('../models/user');  

 
describe('Routing', function() {
  
  var url = request('http://localhost:8081/api');
  
    before(setup.clearDB);
  
  describe('Profile', function() {
    it('should return error trying to save duplicate username', function(done) {
      var profile = {
        username: 'test',
        password: 'test',
        firstName: 'kkkl',
        lastName: 'kkkkk',
        age: '20',
        address: 'address of user',
        gender: 'male'
      };
   
    request(url)
	.post('/api/users')
	.send(profile)
   
	.end(function(err, res) {
          if (err) {
            throw err;
          }
        
          res.should.have.status(400);
          done();
        });
    });
    it('should correctly update an existing profile', function(done){
	var body = {
		firstName: 'lll',
		lastName: 'llklk',
    age: '21',
    address: 'address ',
    gender: 'male'
	};
	request(url)
		.put('/api/users/test')
		.send(body)
		.expect('Content-Type', /json/)
		.expect(200) 
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			
			res.body.should.have.property('_id');
	                res.body.firstName.should.equal('lll');
	                res.body.lastName.should.equal('llklk'); 
                  res.body.age.should.equal('21'); 
                  res.body.address.should.equal('address'); 
                  res.body.gender.should.equal('male');                    
	               
			done();
		});
	});
  });
});