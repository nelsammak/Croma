'use strict';
var Books = require('../models/book.js');
var User = require('../models/user.js');
var cookieParser = require('cookie-parser');
var bReviews = require('../models/book_review.js');
// var path = require('path');
/**
 * A module to export /books routes
 *	@module Book
 */
module.exports = function(router) {

    /**
     * @function addToCurrentlyReading Called on POST "/api/books/:id/currentlyReading" 
     * Adds book to currently reading of the current user
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @params {Number} :id - ID of the book
     * @return {String} {user: 'new User with currently reading updated' 
     */
    router.route('/books/:id/currentlyReading')
        .post(function addToCurrentlyReading(req, res, next) {
            var id = req.params.id;
            if (!req.user) {
                return next('User not logged in');
            }
            var user = req.user;

            Books.findOne({
                '_id': id
            }, function findBookText(err, book) {
                if (err) {
                    res.json({
                        err: err
                    }).status(404);
                }
                if (user.currentlyReading.indexOf(book._id) === -1) {
                    user.currentlyReading.push(book._id);
                }

                User.findOneAndUpdate({
                    '_id': user._id
                }, user, function(err, newUser) {
                    if (err) {

                        return next(err);
                    }
                    res.json({
                        user: newUser
                    });
                })
            })
        })

    /**
     * @function getBookText Called on GET "/api/books/:id/text" 
     * Returns books text and Adds book to currently reading of the current user
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @params {Number} :id - ID of the book
     * @return {String} {user: 'new User with currently reading updated', 
     * book: {text: 'Path of the epub book' }} 
     */
    router.route('/books/:id/text').get(function getBookText(req, res, next) {
        var id = req.params.id;
        if (!req.user) {
            return next('User not logged in');
        }
        var user = req.user;
        Books.findOne({
            '_id': id
        }, function findBookText(err, book) {
            if (err) {
                res.json({
                    err: err
                }).status(404);
            }

            if (user.currentlyReading.indexOf(book._id) === -1) {
                user.currentlyReading.push(book._id);
            }

            User.findOneAndUpdate({
                '_id': user._id
            }, user, function(err, newUser) {
                if (err) {

                    return next(err);
                }
                res.json({
                    user: newUser,
                    book: {
                        text: book.text
                    }
                });
            })
        })

    });

    /**
     * @function getBook Called on GET "/api/books/:id" 
     * Returns book info 
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @params {Number} :id - ID of the book
     * @return {JSON} {book: {BOOK} } 
     */
    router.route('/books/:id').get(function getBook(req, res, next) {
        var id = req.params.id;
        Books.findOne({
            '_id': id
        }, function findBook(err, book) {
            if (err) {
                return next(err);
            }
            res.json({
                book: book
            });
        });
    });
    /**
     * @function getBookCollection Called on GET "/api/books" 
     * Returns All books
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { [{BOOKS}] } 
     */
    router.route('/books').get(function getBooksCollection(req, res, next) {
        Books.find(function findAllBooks(err, books) {
            if (err) {
                next(err);
            }
            res.json(books);
        });
    });

    /**
     * @function getAllLabels Called on GET "/api/labels" 
     * Returns All books
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { [[{'each book labels'}]] } 
     */
    var getAllLabels = function(req, res, next) {
        Book.find({}, function(err, books) {
            if (err) {
                return next(err);
            }
            var labels = [];
            console.log('BOOOKS', books);
            for (var j = 0; j < books.length; j++) {
                for (var i = 0; i < books[j].labels.length; i++) {
                    if (labels.indexOf(books[j].labels[i]) === -1) {
                        labels.push(books[j].labels[i]);
                    }
                }
            }
            res.status(200).json(labels);
        })
    }


    /**
     * @function getLabels Called on GET "/api/books/:id/labels" 
     * Returns All labels of a book
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} {book: {labels: ['book labels']}} 
     */
    var getLabels = function(req, res, next) {
        var id = req.params.id;
        Book.findOne({
            '_id': id
        }, function(err, book) {
            if (err) {
                console.log('ERROR', err);
                return next(err);
            }
            if (book) {
                res.json({
                    book: {
                        labels: book.labels
                    }
                });
            } else {
                res.json({
                    err: 'Book not found'
                })
            }
        });
    }


    /**
     * @function addLabels Called on Post "/api/books/:id/labels" 
     * Returns Book after old labels are removed and new ones added
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { book: {'book'} } 
     */
    var addLabels = function(req, res, next) {
            var id = req.params.id;
            var labels = req.body.labels;
            console.log('LABELS', req.body);
            Book.findOne({
                '_id': id
            }, function(err, book) {
                if (err) {
                    return next(err);
                }
                if (book) {
                    console.log('Book LABELS', book.labels);
                    book.labels = req.body.labels;
                    book.save(function(err, newBook) {
                        if (err) {
                            return next(err);
                        }
                        res.status(201).json({
                            book: newBook
                        });
                    });
                }
            });
        }
        //Route to get the specific book's average Rating
    router.route('/books/:id/avgRating').get(function getBookText(req, res, next) {
        var id = req.params.id;
        Books.findOne({
            '_id': id
        }, function findBookText(err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            var sumOfRatings = 0;
            for (var i = 0; i < book.ratings.length; i++) {
                sumOfRatings += parseInt(book.ratings[i].rating);
            }
            console.log(sumOfRatings);

            if (book.ratings.length > 0) {
                res.json(sumOfRatings / book.ratings.length);
            } else {
                res.json(0);
            }
        })
    });

    router.route('/books/:id/getrate').post(function getMyRating(req, res, next) {
        var id = req.params.id;
        var userId = req.body.userId;
        Books.findOne({
            '_id': id
        }, function findBookText(err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            for (var i = 0; i < book.ratings.length; i++) {
                if (book.ratings[i].id == userId) {
                    return res.json(book.ratings[i].rating);
                }
            }

            return res.json("0");
        })
    });

    router.route('/books/:id/istoberead').post(function getIsToBeReadByMe(req, res, next) {
        var id = req.params.id;
        var userId = req.body.userId;
        User.findOne({
            '_id': userId
        }, function findBookText(err, user) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            if (user.toBeRead.indexOf(id) >= 0) {
                res.json(true);
            } else {
                res.json(false);
            }
        })
    });


    //Route to get the New Arrivals
    router.route('/newarrivals').get(function getBook(req, res, next) {
        var id = req.params.id;
        Books.find({}).sort('-arrivalTime').exec(function(err, books) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            res.status(200).json(books.slice(0, Math.min(5, books.length)));
        });
    });

    //Route to rate the specific book
    router.route('/books/:id/rate').post(function rateBook(req, res, next) {
        var bookId = req.params.id;
        Books.findOne({
            '_id': bookId
        }, function findBook(err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }

            var alreadyRatedByThisUser = false;
            var userId = req.body.userId;
            var rating = String(req.body.rating);

            console.log('user: ' + userId + ', type: ' + typeof userId);
            console.log('book: ' + book._id + ', type: ' + typeof book._id);
            console.log('rating: ' + rating + ', type: ' + typeof rating);
            console.log('book ratings length: ' + book.ratings.length);

            for (var i = 0; i < book.ratings.length; i++) {
                if (book.ratings[i].id == userId) {
                    alreadyRatedByThisUser = true;
                    book.ratings[i]['rating'] = rating; //Update the rating if already have rated
                    break;
                }
            }

            if (!alreadyRatedByThisUser) {
                book.ratings.push({
                    id: userId,
                    rating: rating
                });
                book.markModified('ratings');
                book.save();
                res.json("Rated the book successfully");
            } else {
                book.markModified('ratings');
                book.save();
                res.json("Updated the book rating successfully");
            }

        })
    });

    //Route to get the books of the specified genre
    router.route('/genre/:genre').get(function getBookText(req, res, next) {
        console.log("yeskarim123");
        var genre = req.params.genre;
        Books.find({
            genres: genre
        }, function findBooksByGenre(err, books) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            res.json(books);
        })
    });
    router.route('/books/:id/labels').get(getLabels).post(addLabels);
    router.route('/labels').get(getAllLabels);

    /**
     *	@function getReviews Called on GET "/api/books/:id/review"
     *	Returns the reviews on the current book
     *	@param {Object} req - Http request
     *	@param {Object} res - Http response
     * 	@param {Object} next - Next middleware
     * 	@param {Number} :id - book ID of the currently selected book
     * 	@param {Object} :user - the author of the review (user)	
     *	@returns {JSON} All reviews on the book
     */
    router.route('/books/:id/review')
        .get(function getReviews(req, res, next) {
            console.log("here yo")
            var bookId = req.params.id;
            /*var userId = req.body.userId;*/
            bReviews.find({
                    'bookId': bookId
                }).populate('bookId userId')
                .exec(function(err, reviews) {
                    if (err) {
                        res.status(404).json(err);
                        return next(err);
                    }
                    res.status(200);
                    res.json(reviews);
                });
        })

    /**
     *	@function postReview Called on POST "/api/books/:id/review"
     *	@param {Object} req - Http request
     *	@param {Object} res - Http response
     * 	@param {Object} next - Next middleware
     * 	@param {Number} :id - book ID of the currently selected book
     * 	@param {Object} :user - the current user who is the author of the review	
     *	@returns {JSON} Created review on the current book with the ID of the current user as JSON and returns that new record
     */
    .post(function postReview(req, res, next) {
        var bookId = req.params.id;
        if (!req.user) {
            return next('User not logged in');
        }
        var user = req.user;
        console.log('asdasdasdfasdas', req.body);
        bReviews.create({
            userId: user,
            bookId: bookId,
            review: req.body.review
        }, function(err, reviews) {
            if (err) {
                // res.status(404).json(err);
                return next(err);
            } else {
                res.status(201).json(reviews);
            }
        });
    });
}
