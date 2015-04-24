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
var modRewrite = require('connect-modrewrite');
var cookieParser = require('cookie-parser');
var multer = require('multer');


var MongoStore = require('connect-mongo')(expressSession);


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
app.use(multer({ dest: './files/'}))

app.use(cookieParser('CromaSecret'));

var passportConfig = require('./config/passport')();


app.use(expressSession({
 saveUninitialized: true,
 resave: true,
 secret: 'CromaSecret',
 store: new MongoStore(
    {mongooseConnection:mongoose.connection},
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    })
})
)

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

var router = express.Router(); 
app.use('/api', router);

app.use(modRewrite([
'^/(([^\/]*).xhtml|([0-9]+)/(.+))$ /views/partials/index.html [L]']))

require('./views/epub.js')(router);
require('./views/book.js')(router);
require('./views/user.js')(router);
require('./views/session.js')(router);
require('./views/profile.js')(router);

app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    console.log('Partials', req.url);
    res.render(requestedView);
  });
app.get('/views/*', function(req, res) {
  // var requestedView = path.join('./', req.url)
  console.log(req.url);
})

app.get('/', function(req, res) {
 	res.render('index.html');
});
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


var port = process.env.PORT || 8081; 


app.get('/error', function createError(req, res, next) {
  var err = new Error('Sample error');
  err.status = 500;
  next(err);
});

app.use(function reportInternalServerError(err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.json({err:err, message:"Internal Server Error"});
});



app.listen(port);
console.log('Listening on port', port);
