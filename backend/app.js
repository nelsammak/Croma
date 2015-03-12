var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var models  = require('./models');
var app = express();
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



models.sequelize.sync().complete(function (err) {
    if (err) {
        logger.error(err);
        throw err;
    }
    var port = process.env.PORT || 8081; 
    app.use('/api', router);
    app.use(function (err, req, res) {
        console.log(typeof(err));
        if (typeof(err) == 'SequelizeUniqueConstraintError') {
            res.status(422);
            res.json({message: "Email or username already in use."});
        }
    });
    app.listen(port);
    logger.info('Listening on port', port);
});

