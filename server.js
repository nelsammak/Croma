var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
fs.readdirSync(__dirname+ '/models').forEach(function(filename){
	if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
})

  var Schema = mongoose.Schema;

var booksSchema = new Schema({
		name: String,
    	author: String,
    	genre :String,
    	description :String,
    	imagelocation:String
});

mongoose.Schema = ('books',booksSchema);

app.get('/books', function (req, res){
	console.log("I recieved a GET request");
	mongoose.model('books').find(function (err, books){
		res.json(docs);
		console.log("done");
	});
		
	})




app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log("server is running on port 3000");