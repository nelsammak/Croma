'use strict';
var User = require('../models/user.js'),
  BookClubs = require('../models/bookclub.js'),
  Posts = require('../models/post.js');
var mongoose = require('mongoose');

//Post route to create a Book Club
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
      user.bookClubs.push(mongoose.Types.ObjectId(bookClub._id));
      user.markModified('bookClubs');
      user.save();
      res.status(201).json("Created the Book Club Successfully");
    });
  });

  //Post route to view the Book Clubs  the user is in
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

  //Get route to view a Book Club
  router.route('/bookclubs/:id').get(function getBookClub(req, res, next) {
    BookClubs.findById(req.params.id, function (err, bookClub) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      res.status(200).json(bookClub);
    });
  });

  //Post route to add a Post
  router.route('/addpost/:id').post(function addPost(req, res, next) {
    BookClubs.findById(req.params.id, function (err, bookClub) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      var userId = mongoose.Types.ObjectId(req.body.userId);
      var title = req.body.title;
      if(req.body.text) {
        var post = new Posts({
          poster: userId,
          title: title,
          post: req.body.text
        });
        post.save(function(err, post2) {
          if (err) return console.error(err);
          bookClub.posts.push({title: title, id: post2._id});
          bookClub.markModified('posts');
          bookClub.save();
          res.status(200).json(post);
        });
      }
      else {
        var post = new Posts({
          poster: userId,
          title: title
        });
        post.save(function(err, post2) {
          if (err) return console.error(err);
          bookClub.posts.push({title: title, id: post2._id});
          bookClub.markModified('posts');
          bookClub.save();
          res.status(200).json(post);
        });
      }
      });
    });
  router.route('/invitetobookclub/:id').post(function addPost(req, res, next) {
    BookClubs.findById(req.params.id, function (err, bookClub) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      User.findOne({username: req.body.user}, function (err, user) {
        if (err) {
          res.status(404).json(err);
          return next(err);
        }
        var title = req.body.title;
        var alreadyContainsThisInvite = false;
        for (var i = 0; i < user.invites.length; i++) {
          if(user.invites[i].id == req.params.id) {
            alreadyContainsThisInvite = true;
            break;
          }
        }
        if(!alreadyContainsThisInvite) {
          user.invites.push({title: title, id: req.params.id});
          user.markModified('invites');
          user.save();
          res.status(200).json("Invited the user succesfully");
        }
        else
          res.status(200).json("Already invited the user");
        });
      });
    });
};