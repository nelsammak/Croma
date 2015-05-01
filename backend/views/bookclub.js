'use strict';
var User = require('../models/user.js'),
  BookClubs = require('../models/bookclub.js');
var mongoose = require('mongoose');

module.exports = function(router) {
  router.route('/bookclubs/createbookclub').post(function createBookClub(req, res, next) {
    User.findById(req.body.userId, function (err, user) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      var bookClub = new BookClubs({creator: mongoose.Types.ObjectId(req.body.userId),
        name: req.body.title,
        users: [mongoose.Types.ObjectId(req.body.userId)]});
      bookClub.save();
      console.log("hi");
      var config = require('../config/config.json')[process.env.NODE_ENV];
      console.log(config.db.url);
      console.log(req.body.userId);
      user.bookClubs.push(mongoose.Types.ObjectId(bookClub._id));
      user.markModified('bookClubs');
      user.save();
      res.status(201).json("Created the Book Club Successfully");
    });
  });

  router.route('/bookclubs').post(function getBookClubs(req, res, next) {
    User.findById(req.body.userId, function (err, user) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      BookClubs.find({users: mongoose.Types.ObjectId(req.body.userId)}, function (err, bookClubsResult) {
        if (err) {
          return next(err);
        }
        res.status(201).json(bookClubsResult);
      });
    });
  });

  router.route('/bookclubs/:id').get(function getBookClub(req, res, next) {
    BookClubs.findById(req.params.id, function (err, bookClub) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      res.status(200).json(bookClub);
    });
  });

  router.route('/addpost/:id').post(function addPost(req, res, next) {
    BookClubs.findById(req.params.id, function (err, bookClub) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      var userId = req.body.userId;
      var title = req.body.title;
      var post = new Posts ({
        poster: userId,
        title: title,
        comments: [{commenter: userId, text: req.body.text}]
      });
      post.save();

      bookClub.posts.push({title: title, id: post._id});
      bookClub.markModified('posts');
      bookClub.save();
      res.status(200).json("Added the Post Successfully");
      });
    });
};