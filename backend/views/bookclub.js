'use strict';
var User = require('../models/user.js'),
  BookClubs = require('../models/bookclub.js');

module.exports = function(router) {
  router.route('/bookclubs/createbookclub').post(function createBookClub(req, res, next) {
    User.findById(req.body.userId, function (err, user) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      var bookClub = new BookClubs({creator: req.body.userId, name: req.body.title, users: [req.body.userId]});
      bookClub.save();
      console.log("hi");
      var config = require('../config/config.json')[process.env.NODE_ENV];
      console.log(config.db.url);
      console.log(req.body.userId);
      user.bookClubs.push(bookClub._id);
      user.markModified('bookClubs');
      user.save();
      res.status(200).json("Created the Book Club Successfully");
    });
  });

  router.route('/bookclubs').post(function getBookClubs(req, res, next) {
    User.findById(req.body.userId, function (err, user) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      BookClubs.find({users: req.body.userId}, function (err, bookClubsResult) {
        if (err) {
          return next(err);
        }
        res.status(200).json(bookClubsResult);
      });
    });
  });
};