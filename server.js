var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
require('./models/books.js');
mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/public'));

app.get('/books', function (req, res){


	console.log("I recieved a GET request");
	mongoose.model('books').find(function (err, books){
		res.json(books);
		console.log("done");
	});
		
	});
 app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); 
    });



app.listen(3000);
console.log("server is running on port 3000");