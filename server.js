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
    genre :String,
    description :String,
    imagelocation:String
   })

  var Book = mongoose.model('Book', booksSchema);
  var NorthAndSouth = new Book({
   name: 'North And South',
   author: 'Elizabeth Gaskell',
   genre: 'Classic Fiction & Romance',
   description :'Elizabeth Gaskell skillfully fuses individual feeling with social concern, 
   and in Margaret Hale creates one of the most 
   original heroines of Victorian literature.',
   imagelocation:'blabla'
    })
  console.log(Book.name);

  NorthAndSouth.save(function (err, NorthAndSouth) {
  	if (err) return console.error(err);
  
});
Books.find({ name: /^NorthAndSouth/ }, callback)

});



app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log("server is running on port 3000");