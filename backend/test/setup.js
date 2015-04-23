/*globals before,beforeEach,after,afterEach,describe,it */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var config = require('../config/config.json');

var url = 'http://localhost:8081';
var api = url + "/api";
var none = function() {};

var clearDBHelper = function clearDB(done) {
   mongoose.connect(config.test.db.url, function(){
    for (var collection in mongoose.connection.collections){
        mongoose.connection.collections[collection].drop( function(err) {
            console.log('collection dropped');
        });
    }
    done();
   });
};



 var clearDB = function(done) {
     if (mongoose.connection.readyState === 0) {
         mongoose.connect(config.test.db.url, function(err) {
             if (err) {
                 throw err;
             }
             return clearDBHelper(done);
        });
    } else {
        return clearDBHelper(done);
    }
};

before(function(done) {
     if (mongoose.connection.readyState === 0) {
         mongoose.connect(config.test.db.url, function(err) {
             if (err) {
                 throw err;
             }
             console.log('CONNECTED TO DB');
             done();
        });
    } else {
        console.log('readyState != 0');
        done();
    }
})

after(function(done) {
    mongoose.disconnect();
    return done();
});

module.exports = {
    url: url,
    api: api,
    clearDB: clearDB,

};
