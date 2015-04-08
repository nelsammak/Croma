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

//importing the book model
var Books = require('./models/book.js');

//inserting the books
require('./inserts/book');

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


app.use(expressSession( {
  saveUninitializedtialized: true,
  resave: true,
  secret: 'CromaSecret'
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

var router = express.Router(); 
app.use('/api', router);


//routes NEEDS TO BE RENDERED INSTEAD OF SEND

require('./views/book.js')(router);
require('./views/users.js')(router);
require('./views/session.js')(router);
require('./views/profile.js')(router);


app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/', function(req, res) {
    res.render('index.html');
  });

var port = process.env.PORT || 8081;

app.get('/error', function createError(req, res, next) {
  var err = new Error('Sample error');
  err.status = 500;
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json("Something broke!");
});

app.listen(port);
console.log('Listening on port', port);
