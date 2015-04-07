//imports
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var app = express();
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('passport');

//importing the book model
var Books = require('./models/book.js')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config.json')[process.env.NODE_ENV];

console.log(config);

mongoose.connect(config.db.url);

app.use(express.static(path.join(__dirname, '../frontend'))); 
app.set('views', path.join(__dirname, '../frontend/views'));
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var passportConfig = require('./config/passport')();


app.use(expressSession({
 saveUninitialized: true,
 resave: true,
 secret: 'CromaSecret'
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

var router = express.Router(); 


//routes NEEDS TO BE RENDERED INSTEAD OF SEND
app.get('/books', function getBooksIndex (req, res, next) {
  res.sendFile(path.join(__dirname, '../frontend', 'views', 'books.html'));
});

app.get('/books2', function getBooksCollection (req, res, next) {
  console.log("I recieved a GET request");
  Books.find(function (err, books) {
    if (err) {
      next(err);
    }
    res.json(books);
  });
});


require('./views/users.js')(router);
require('./views/session.js')(router);
require('./views/profile.js')(router);
app.use('/api', router);

app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/', function(req, res) {
    res.render('index.html');
  });


var port = process.env.PORT || 8081; 



app.use(function reportInternalServerError(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.json({err:err, message:"Internal Server Error"});
});

app.listen(port);
console.log('Listening on port', port);
