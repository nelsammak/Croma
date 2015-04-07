
var express = require('express');
var router = express.Router();


var search = {};
var mongoose = require('mongoose');
var Book= require('../models/book.js');

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
 * post '/api/businesses/' for searching. The SQL equivalent is :
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






module.exports = router;