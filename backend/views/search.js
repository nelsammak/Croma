
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var  url = require('url');
var router = express.Router();
var es = require('elasticsearch');
var elastic = new es.Client({ host: 'localhost:9200' });
var Book = require('../models/book.js');
var search = {};

    module.exports = function(router) {

    router.route('/search')
       // .get(function (req,res,next) {
               // if (err) {
                   // next(err);
               /// } else {
                    //res.status(201);
                   // res.json(post);
               // }
          //  });
        };


// Mapping for Elastic Search
Book.createMapping(function(err, mapping){
	  if(err){
	    console.log('error creating mapping (you can safely ignore this)');
	    console.log(err);
	  }else{
	    console.log('mapping created!');
	    console.log(mapping);
	  }
	});

var searchResultFactory = function (res) {
	return function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  }
};

/**
 * post '/api/book/' for searching. The SQL equivalent is :
 * 
 * 		select *
 * 		from BOOK r
 * 		where search isn r.name 
 * 
 */
router.post('/', function(req, res, next) {
	var value = req.body.search;
	
		book.search(
				{ 
					query_string : {
						fields : [ "name" ,  "author" , "publisher" ],
						query : value
					
				},
				 hydrate:true},
				function (err, post) {
				    if (err) return next(err);
				    res.json(post);
				
				  });
	
	});

 router.get('/', function(app,passport, req, res, next) {
      res.send('respond with a resource');
    });






// module.exports = router;