var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  var booksSchema = mongoose.Schema({
    name: String,
    author: String,
    description :String,
    imagelocation:String

})

});



app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log("server is running on port 3000");