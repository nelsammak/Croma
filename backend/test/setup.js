/*globals before,beforeEach,after,afterEach,describe,it */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var config = require('../config/config.json');

var url = 'http://localhost:8081';
var api = url + "/api";
var none = function() {};


var clearDB = function clearDB(done) {
   mongoose.connect(config.test.db.url, function(){
    mongoose.connection.db.dropDatabase(function(){
        done();
    });
   });
};



// before(function(done) {
//     if (mongoose.connection.readyState === 0) {
//         mongoose.connect(config.test.db.url, function(err) {
//             if (err) {
//                 throw err;
//             }
//             return clearDB(done);
//         });
//     } else {
//         return clearDB(done);
//     }
// });

// after(function(done) {
//     mongoose.disconnect();
//     return done();
// });

module.exports = {
    url: url,
    api: api,
    clearDB: clearDB,
};




