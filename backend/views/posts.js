'use strict';
var User = require('../models/user.js'),
  Posts = require('../models/post.js');
var mongoose = require('mongoose');

module.exports = function(router) {
  /**
   * @function getBookClubs Called on POST "/api/bookclubs"
   * View the Book Clubs  the user is in
   * @param {Object} req - Http request
   * @param {Object} res - Http response
   * @param {Object} next - Next middleware
   * @return {JSON} {'Book Clubs'}
   */
  router.route('/posts/:id').get(function getPosts(req, res, next) {
    Posts.findById(req.params.id, function (err, post) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      res.status(201).json(post);
    });
  });

  router.route('/addcomment/:id').post(function getPosts(req, res, next) {
    Posts.findById(req.params.id, function (err, post) {
      if (err) {
        res.status(404).json(err);
        return next(err);
      }
      post.comments.push({comment: req.body.comment, name: req.body.name, userId: req.body.userId});
      post.markModified('comments');
      post.save();
      res.status(201).json("OK");
    });
  });
};