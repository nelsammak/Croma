
'use strict';
var Books = require('../models/book.js');
var User = require('../models/user.js');
var Genres = require('../models/genres.js');
var cookieParser = require('cookie-parser');
var bReviews = require('../models/book_review.js');

// var path = require('path');
/**
 * A module to export /books routes
 *  @module Book
 */
module.exports = function(router) {

    /**
    * @function addToCurrentlyReading Called on POST "/api/books/:id/currentlyReading" 
    * Adds book to currently reading of the current user
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @param {Number} :id - ID of the book
    * @return {String} {user: 'new User with currently reading updated'
    */
    router.route('/books/:id/currentlyReading')
        .post(function addToCurrentlyReading (req, res, next) {
            var id = req.params.id;
            if (!req.user) {
                return next('User not logged in');
            }
            var user = req.user;

            Books.findOne({'_id': id}, function findBookText(err, book) {
                if (err) {
                    res.json({err: err}).status(404);
                }
                if(user.currentlyReading.indexOf(book._id) === -1) {
                    user.currentlyReading.push(book._id);
                }

                User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
                    if (err) {

                        return next(err);
                    }
                    res.json({user: newUser});
                })
            })
        })
        /**
        * @function removeCurrentlyReading -  called on Delete "/books/:id/currentlyReading"    
        * removes a book from user's currently reading list
        * @params {Object} req - Http request
        * @params {Object} res - Http response
        * @params {Object} next - Next middleware
        * @returns {JSON} string "Removed the book successfully" as JSON
        */
        .delete(function removeCurrentlyReading(req, res, next) {
            var bookId = req.params.id;
            var userId = req.user.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    res.status(404).json(err);
                    return next(err);
                }
                var index = user.currentlyReading.indexOf(bookId);
                if (index > -1) {
                    user.currentlyReading.splice(index, 1);
                }
                user.save();
                res.json("Removed the book successfully");
            });
        });

    router.route('/books/:id/ToBeRead')
        /**
        * @function addToBeRead -  called on Post "/books/:id/ToBeRead" 
        * adds a book from user's tobe read list
        * @params {Object} req - Http request
        * @params {Object} res - Http response
        * @params {Object} next - Next middleware
        * @returns {JSON} string "Added the book successfully" as JSON
        */
        .post(function addToBeRead(req, res, next) {
            var bookId = req.params.id;
            var userId = req.user.id;
            User.findById(userId, function (err, user) {
              if (err) {
                res.status(404).json(err);
                return next(err);
              }
              if (user.toBeRead.indexOf(bookId) > -1) { //Already has the book in his Currently Reading List
                return res.json("Already has the book");
              }
              else {
                user.toBeRead.push(bookId);
              }
              user.save();
              res.json("Added the book successfully");
            });
        })
        /**
        * @function removeToBeRead -  called on Delete "/books/:id/ToBeRead"    
        * removes a book from user's tobe read list
        * @params {Object} req - Http request
        * @params {Object} res - Http response
        * @params {Object} next - Next middleware
        * @returns {JSON} string "Removed the book successfully" as JSON
        */
        .delete(function removeToBeRead(req, res, next) {
            var bookId = req.params.id;
            var userId = req.user.id;
            //var userId = req.params.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    res.status(404).json(err);
                    return next(err);
                }
                var index = user.toBeRead.indexOf(bookId);
                if (index > -1) {
                    user.toBeRead.splice(index, 1);
                }
                user.save();
                res.json("Removed the book successfully");
            });
        });

    /**
    * @function getBookText Called on GET "/api/books/:id/text" 
    * Returns books text and Adds book to currently reading of the current user
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @param {Number} :id - ID of the book
    * @return {String} {user: 'new User with currently reading updated', 
    * book: {text: 'Path of the epub book' }} 
    */
    router.route('/books/:id/text').get(function getBookText (req,res,next){
        var id = req.params.id;
        if (!req.user) {
            return next('User not logged in');
        }
        var user = req.user;
        Books.findOne({'_id': id}, function findBookText(err, book) {
            if (err) {
                res.json({err: err}).status(404);
            }

            if(user.currentlyReading.indexOf(book._id) === -1) {
                user.currentlyReading.push(book._id);
            }

            User.findOneAndUpdate({'_id' : user._id}, user, function (err, newUser) {
                if (err) {

                    return next(err);
                }
                res.json({user: newUser, book: {text: book.text}});
            })
        })

    });

    /**
    * @function getBook Called on GET "/api/books/:id" 
    * Returns book info 
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @param {Number} :id - ID of the book
    * @return {JSON} {book: {BOOK} } 
    */
    router.route('/books/:id').get(function getBook (req,res,next){
        var id = req.params.id;
        Books.findOne({'_id': id}, function findBook(err, book) {
            if (err) {
                return next(err);
            }
            res.json({book: book});
        });
    }); 

    /**
    * @function deleteBook Called on DELETE "/api/books/:id"  
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @param {Number} :id - ID of the book
    */
    router.route('/books/:id').delete(function deleteBook (req,res,next){
        var id = req.params.id;
        Books.findOneAndRemove({'_id': id}, function removeBook(err, book) {
            if (err) {
                return next(err);
            }
            book.remove();

            res.status(200).json(book);         
            
        });
    }); 
    /**
    * @function getBookCollection Called on GET "/api/books" 
    * Returns All books
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @return {JSON} { [{BOOKS}] } 
    */
    router.route('/books').get(function getBooksCollection (req, res, next) {
        Books.find(function findAllBooks(err, books) {
            if (err) {
                next(err);
            }
            res.json(books);
        });
    });
    /**
    * @function getBestSellers Called on GET "/api/bestsellers" 
    * Returns all books that have label best seller
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @return {JSON} { [{BOOKS}] } - best sellers
    */
    router.route('/bestsellers').get(function getBestSellers (req, res, next) {
        Books.find({'labels.text' : 'BestSeller'}, function findBooksByBestSellers (err, books) {
            if (err) {
                next(err);
            }
            res.json(books);
        });
    });
    /**
    * @function getAllLabels Called on GET "/api/labels" 
    * Returns All books
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @return {JSON} { [[{'each book labels'}]] } 
    */
    var getAllLabels = function (req, res, next) {
        /*Book.find({}, function (err, books) {*/
            /*if (err) {
                return next(err);
            }
            var labels = [];
            console.log('BOOOKS', books);
            for (var j = 0; j < books.length; j++) {
                for(var i = 0; i < books[j].labels.length; i++) {
                    if (labels.indexOf(books[j].labels[i]) === -1) {
                        labels.push(books[j].labels[i]);
                    }
                }
            }
            res.status(200).json(labels);
        })*/

var searchTerm = new RegExp(req.query.searchTerm, "i");
        
        
                /*Book.find()
                .or([{'labels' : {$regex :searchTerm} }}])
                .exec(cb);*/
                
        Books.find({'labels' : {$regex :searchTerm} }, function (err, book) {
            if (err) {
                return next(err);
            }
            
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
    var getLabels = function (req, res, next) {
        var id = req.params.id;
        Book.findOne({'_id': id}, function (err, book) {
            if (err) {
                console.log('ERROR', err);
                return next(err);
            }
            if (book) {
                res.json({book: {labels: book.labels}});
            } else {
                res.json({err: 'Book not found'})
            }
        });
    }


    /**
    * @function addLabels Called on Post "/api/books/:id/labels" 
    * Changes labels after a label is added or removed
    * @params {Object} req - Http request
    * @params {Object} res - Http response
    * @params {Object} next - Next middleware
    * @return {JSON} { book: {'book'} } 
    */
    var addLabels = function (req, res, next) {
        var id = req.params.id;
        var labels = req.body.labels;
        console.log('LABELS' , req.body);
        Books.findOne({'_id': id}, function (err, book) {
            if (err) {

                    return next(err);
                }
            

                console.log('Book LABELS', book.labels);
                book.labels = req.body.labels;
                book.save(function (err, newBook){
                    if (err) {
                        return next(err);
                    }
                    res.status(201).json({book: newBook});
                });
            
        });
    }

    /**
     * @function getBookAvgRating Called on Get "/api/books/:id/avgRating"
     * Returns Book's average Rating
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { 'avgRating' }
     */
    router.route('/books/:id/avgRating').get(function getBookAvgRating(req, res, next) {
        var id = req.params.id;
        Books.findOne({'_id': id}, function (err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }

            if (book.ratings.length > 0) {
                res.json(book.avgRating);
            }
            else {
                res.json(0);
            }
        })
    });

    /**
     * @function getMyRating Called on Get "/api/books/:id/getrate"
     * Returns the User's rating of the Book
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { 'rating' }
     */
    router.route('/books/:id/getrate').post(function getMyRating(req, res, next) {
        var id = req.params.id;
        var userId = req.body.userId;
        Books.findOne({'_id': id}, function findBookText(err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            for(var i = 0; i < book.ratings.length; i++) {
                if(book.ratings[i].id==userId) {
                    return res.json(book.ratings[i].rating);
                }
            }

            return res.json(0);
        })
    });

    router.route('/books/:id/istoberead').post(function getIsToBeReadByMe(req, res, next) {
        var id = req.params.id;
        var userId = req.body.userId;
        User.findOne({'_id': userId}, function findBookText(err, user) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            if(user.toBeRead.indexOf(id)>=0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        })
    });


    //Route to get the New Arrivals
    router.route('/newarrivals').get(function getBook(req, res, next) {
        var id = req.params.id;
        Books.find({}).sort('-arrivalTime').exec(function (err, books) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            res.status(200).json(books.slice(0, Math.min(5, books.length)));
        });
    });

    /**
     * @function rateBook Called on Get "/api/books/:id/rate"
     * Rates the Book
     * @params {Object} req - Http request
     * @params {Object} res - Http response
     * @params {Object} next - Next middleware
     * @return {JSON} { 'message' }
     */
    router.route('/books/:id/rate').post(function rateBook(req, res, next) {
        var bookId = req.params.id;
        Books.findOne({'_id': bookId}, function findBook(err, book) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }

            var alreadyRatedByThisUser = false;
            var userId = req.body.userId;
            var rating = req.body.rating;

            console.log('user: ' +  userId + ', type: ' + typeof userId);
            console.log('book: ' +  book._id + ', type: ' + typeof book._id);
            console.log('rating: ' +  rating + ', type: ' + typeof rating);
            console.log('book ratings length: ' + book.ratings.length);

            for (var i = 0; i < book.ratings.length; i++) {
                if (book.ratings[i].id == userId) {
                    alreadyRatedByThisUser = true;
                    book.ratingsSum -= book.ratings[i]['rating'];
                    book.ratings[i]['rating'] = rating; //Update the rating if already have rated
                    break;
                }
            }

            if (!alreadyRatedByThisUser) {
                book.ratingsSum += rating;
                book.ratings.push({id: userId, rating: rating});
                book.markModified('ratings');
                book.avgRating = book.ratingsSum / book.ratings.length;
                book.save();
            }
            else {
                book.ratingsSum += rating;
                book.markModified('ratings');
                book.avgRating = book.ratingsSum / book.ratings.length;
                book.save();
            }

            User.findOne({'_id': userId}, function findBookText(err, user) {
                if (err) {
                    res.status(404).json(err);
                    return next(err);
                }
                alreadyRatedByThisUser = false;
                for (var i = 0; i < user.ratings.length; i++) {
                    if (user.ratings[i].id == bookId) {
                        alreadyRatedByThisUser = true;
                        user.ratings[i]['rating'] = rating; //Update the rating if already have rated
                        break;
                    }
                }

                if (!alreadyRatedByThisUser) {
                    user.ratings.push({id: bookId, rating: rating});
                    user.markModified('ratings');
                    user.save();
                    res.json("Rated the book successfully");
                }
                else {
                    user.markModified('ratings');
                    user.save();
                    res.json("Updated the book rating successfully");
                }
            });

        });
    });
    /**
    * @function getGenres Called on GET "/api/genre" 
    * Returns All genres
    * @param {Object} req - Http request
    * @param {Object} res - Http response
    * @param {Object} next - Next middleware
    * @return {JSON} { [{GENRES}] } 
    */
    router.route('/genre').get(function getGenres(req, res, next) {
        Genres.find(function findAllGenres(err, genres) {
            if (err) {
                next(err);
            }
            res.json(genres);
        });
    });
    //Route to get the books of the specified genre
    router.route('/genre/:genre').get(function getBookText(req, res, next) {
        console.log("yeskarim123");
        var genre = req.params.genre;
        Books.find({ genres: genre }, function findBooksByGenre (err, books) {
            if (err) {
                res.status(404).json(err);
                return next(err);
            }
            res.json(books);
        })
    });

    router.route('/books/:id/ToBeRead')
    /**
    * @function addToBeRead -  called on Post "/books/:id/ToBeRead" 
    * adds a book from user's tobe read list
    * @params {Object} req - Http request
    * @params {Object} res - Http response
    * @params {Object} next - Next middleware
    * @returns {JSON} string "Added the book successfully" as JSON
    */
        .post(function addToBeRead(req, res, next) {
            var bookId = req.params.id;
            var userId = req.user.id;
            User.findById(userId, function (err, user) {
              if (err) {
                res.status(404).json(err);
                return next(err);
              }
              if (user.toBeRead.indexOf(bookId) > -1) { //Already has the book in his Currently Reading List
                return res.json("Already has the book");
              }
              else {
                user.toBeRead.push(bookId);
              }
              user.save();
              res.json("Added the book successfully");
            });
        })
    /**
    * @function removeToBeRead -  called on Delete "/books/:id/ToBeRead"    
    * removes a book from user's tobe read list
    * @params {Object} req - Http request
    * @params {Object} res - Http response
    * @params {Object} next - Next middleware
    * @returns {JSON} string "Removed the book successfully" as JSON
    */
        .delete(function removeToBeRead(req, res, next) {
            var bookId = req.params.id;
            var userId = req.user.id;
            //var userId = req.params.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    res.status(404).json(err);
                    return next(err);
                }
                var index = user.toBeRead.indexOf(bookId);
                if (index > -1) {
                    user.toBeRead.splice(index, 1);
                }
                user.save();
                res.json("Removed the book successfully");
            });
        });

    router.route('/books/:id/labels').get(getLabels).post(addLabels);
    router.route('/labels').get(getAllLabels);


    
/**
     *  @function getReviews Called on GET "/api/books/:id/review"
     *  Returns the reviews on the current book
     *  @param {Object} req - Http request
     *  @param {Object} res - Http response
     *  @param {Object} next - Next middleware
     *  @param {Number} :id - book ID of the currently selected book
     *  @param {Object} :user - the author of the review (user) 
     *  @returns {JSON} All reviews on the book
     */
    router.route('/books/:id/review')
        .get(function getReviews(req, res, next) {
            console.log("here yo")
            var bookId = req.params.id;
            /*var userId = req.body.userId;*/
            bReviews.find({
                    'bookId': bookId
                }).populate('bookId userId upVotes downVotes')
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
     *  @function postReview Called on POST "/api/books/:id/review"
     *  @param {Object} req - Http request
     *  @param {Object} res - Http response
     *  @param {Object} next - Next middleware
     *  @param {Number} :id - book ID of the currently selected book
     *  @param {Object} :user - the current user who is the author of the review    
     *  @returns {JSON} Created review on the current book with the ID of the current user as JSON and returns that new record
     */
    .post(function postReview(req, res, next) {
        var bookId = req.params.id;
        if (!req.user) {
            return next('User not logged in');
        }
        var user = req.user;
        console.log(req.body.delete);
        console.log(req.body.userId);
        if (req.body.delete && (user._id == req.body.userId || user.admin)) {
            bReviews.findOneAndRemove({
                _id: req.body.reviewId
            }, function(err, reviews) {
                if (err) {
                    // res.status(404).json(err);
                    return next(err);
                } else {
                    res.status(201).json(reviews);
                }
            });
        } else {
            if (req.body.vote) {
                console.log('review vote', req.body.reviewId);
                bReviews.findOne({
                        _id: req.body.reviewId
                    },
                    function(err, review) {
                        if (err) {
                            return next(err);
                        } else {
                            console.log(review);
                            console.log('up:', req.body.upV);
                            console.log('down: ', req.body.downV);
                            review.downVotes = req.body.downV;
                            review.upVotes = req.body.upV;
                            review.markModified('upVotes');
                            review.markModified('downVotes');
                            review.save();
                            res.status(201).json(review);
                        }
                    });
            } else {
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
            }
        }
   });


}