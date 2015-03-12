var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skorr');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
var logger = new (winston.Logger)({
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

var router = express.Router(); 

require('./views/users.js')(router, logger);



var port = process.env.PORT || 8081; 
app.use(function (err, req, res) {
    if (typeof(err) == 'SequelizeUniqueConstraintError') {
        res.status(422);
        res.json({message: "Email or username already in use."});
    }
});
app.use('/api', router);
app.listen(port);
logger.info('Listening on port', port);