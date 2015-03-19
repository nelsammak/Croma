var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config.json')[process.env.NODE_ENV];
console.log(config);

require('./models/book.js');
mongoose.connect(config.db.url);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
var logger = new (winston.Logger) ({
    transports: [
    new (winston.transports.File)({
        name: 'info-file',
        filename: 'log/infolog',
        level: 'info',
        timestamp: true
    }), 
    new (winston.transports.File)({
        name: 'error-file',
        filename: 'log/errorlog',
        level: 'error',
        timestamp: true
    }),
    new(winston.transports.Console)()
    ]
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../frontend', 'views')));

app.get('/books', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend', 'views', 'books.html'));
});

app.get('/books2', function (req, res) {
  console.log("I recieved a GET request");
  mongoose.model('book').find(function (err, books) {
    res.json(books);
    console.log("done");
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend', 'views', 'index.html'));
});

var router = express.Router(); 
require('./views/users.js')(router, logger);

var port = process.env.PORT || 8081; 
app.use('/api', router);

app.use(function (err, req, res) {
    res.status(500);
    res.json({err:err, message:"Internal Server Error"});
});


app.listen(port);
//logger.info('Listening on port', port);