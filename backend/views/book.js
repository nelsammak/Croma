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