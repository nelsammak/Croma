var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var app = express();
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('passport');






process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config.json')[process.env.NODE_ENV];

console.log(config);

mongoose.connect(config.db.url);

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


app.use(express.static(path.join(__dirname, '../frontend'))); 

var router = express.Router(); 

require('./views/users.js')(router);
require('./views/session.js')(router);
require('./views/profile')(router);


var port = process.env.PORT || 8081; 

app.use('/api', router);

app.use(function (err, req, res) {
    res.status(500);
    res.json({err:err, message:"Internal Server Error"});
});

app.listen(port);
console.log('Listening on port', port);
