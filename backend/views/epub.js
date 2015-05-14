var Epub = require('epub'),
	fs = require('fs'),
	flow = require('../config/flow-node.js')('../frontend/books/bookEpub'),
	Book = require('../models/book.js'),
	fileBase = '../frontend/',
	imageDirectory = '../frontend/books/bookCovers/',
	imageDirectoryStatic = 'books/bookCovers/',
	linkDirectory = '../frontend/books/bookLinks/';
var Genre = require('../models/genres.js');
module.exports = function(router) {
		router.route('/admin/addBook').post(saveEpubData);
	}
	//code to remove books from DB if we want to
	//Book.remove({}, function error (err) {});
	//code to remove genres from DB if we want to
	//Genre.remove({}, function error (err) {});

var saveEpubData = function(req, res, next) {
	try {
		console.log('REQUEST IS', req.body);

		flow.post(req, function(status, filename, original_filename, identifier) {
			console.log('Chunck number', req.body.flowChunkNumber, ', status', status);
			if (status == 'done' && req.body.flowTotalChunks == req.body.flowChunkNumber) {

				var stream = fs.createWriteStream('../frontend/books/bookEpub/' + filename);
				flow.write(identifier, stream, {
					onDone: function() {

						flow.clean(identifier);

						console.log('file: ', filename, 'succesfully saved.');
						var epubTitle = filename;
						var epubPath = 'books/bookEpub/' + epubTitle;
						var imagePath = '';
						var imagePathStatic = '';

						try {
							var epub = new Epub(fileBase + epubPath,
								imageDirectory, linkDirectory);
						} catch (err) {
							return next(err);
						}

						epub.on('end', function() {
							console.log('EPUB METADATA', epub.metadata);

							if (epub.metadata.cover) {
								imagePath = imageDirectory + identifier + '.jpg';
								epub.getImage(epub.metadata.cover, function(err, img, mimetype) {
									if (err) {
										return next(err);
									}
									fs.writeFile(imagePath, img, function(err) {
										if (err) {
											return next(err);
										}
									});
								})
								imagePathStatic = imageDirectoryStatic + identifier + '.jpg';
							} else {
								imagePathStatic = imageDirectoryStatic + 'default_cover.jpg';
							}
							var subjects = [];
							if (epub.metadata.subject) {
								subjects = epub.metadata.subject.split(/, | & /);
							} else {
								subjects = ["Unspecified"];
							}

							Book.find({
								'name': epub.metadata.title
							}, function(err, found) {
								if (err) {
									return next(err);
								}
								if (found.length != 0) {
									res.status(400).json({'err': ' A book with the same title have been uploaded before'});
									return;
								}

								var book = new Book({
									name: epub.metadata.title,
									author: epub.metadata.creator,
									coverLocation: imagePathStatic,
									text: epubPath,
									genres: subjects,
									bio: epub.metadata.description
								})
								book.save(function saveBook(err, newBook) {
									if (err) {
										return next(err);
									}
									res.json(newBook).status(201);
								})
								console.log(subjects);
								for (var i = 0; i < subjects.length; i++) {
									Genre.findOneAndRemove({
										"name": subjects[i]
									}, function(err, person) {
										if (err) {
											console.log('got an error');
										}
									});
									var genre = new Genre({
										name: subjects[i]
									});
									genre.save(function func(err, genre) {
										if (err) return console.error(err);
									});
								}
							});
						});
						try {
							epub.parse();
						} catch (err) {
							next(err);
						}
					}
				});

			} else if (status == 'partly_done') {
				res.json({}).status(200);
			}

		});
	} catch (err) {
		next(err);
	}
}
