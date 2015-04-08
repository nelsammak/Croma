
var express = require('express');
var router = express.Router();
var moment = require('moment');
var es = require('elasticsearch');
var elastic = new es.Client({ host: 'localhost:9200' });
var search = {};
var mongoose = require('mongoose');
var Book= require('../models/book.js');


module.exports = function(router) {
  
    router.route('/search')
        //.post(function (req,res,next) {
            // function (err, search) {
               // if (err) {
                  //  next(err);
               // } else {
                   // res.status(201);
                   // res.json(search);
               // }
           // });
        }
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


	function launchSearch (payload) {	
			elastic.search(payload).then(function (response) { 
			return res.send(response); 
		}, function (err) {
			console.log(err);
		});
	}

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
 * 		where search in r.name 
 * 
 */
router.post('/', function(req, res, next) {
	var value = req.body.search;
	
		book.search(
				{ 
					query_string : {
						fields : [ "title" ,  "author","publisher" ],
						query : value
					
				},
				 hydrate:true},
				function (err, post) {
				    if (err) return next(err);
				    res.json(post);
				
				  });
	
	});






//module.exports = router;