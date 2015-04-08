var request = require('supertest');
var should = require('should');
var setup = require('./setup');
var User = require('../models/book');
var esClient  = new elastical.Client();
var ObjectId  = Schema.ObjectId;
var async  = require('async');

describe('Routing', function() {
var url= request('http://localhost:8081/api');
describe('search', function(){
  before(function(done){
    mongoose.connect(config.mongoUrl, function(){
      book.remove(function(){
        config.deleteIndexIfExists(['books'], function(){
          var books = [
              new Book({name:'ll', publisher:'A', author:'A',coverLocation:'aa',Bio:'Bioo'}),
              new Book({name:'lc', publisher:'Ab', author:'Ah',coverLocation:'aa2',Bio:'Bioo1'}),
              new Book({name:'lk', publisher:'Ac', author:'Aj',coverLocation:'aa1',Bio:'Bioo2'}),
            
          ];
          async.forEach(books, save, function(){
            setTimeout(done, 1100);
          });
        });
      });
    });
  });
  after(function(done){
    book.remove(done);
  });


 
describe('search', function(){
    it('should be able to find book', function(done){
     book.search({
        query_string: {query: "ll"}, hydrate:true} 
       
       request(url)
		.put('/api/book/ll')
		.send(book.search)
		.expect('Content-Type', /json/)
		.expect(200) 
		.end(function(err,res) {
			if (err) {
				throw err;
			} 
			});
     // , function(err, res){
      //  res.hits.total.should.eql(2);
      //  res.hits.hits.forEach(function(book){
      //    ['Legal', 'Construction'].should.containEql(book._source.name);
       // }
       // done();
    //  };
    
  });


function save(model, cb){
  model.save();
  model.on('es-indexed', cb);
}





});
};