var Epub = require('epub'),
	fs = require('fs'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart(),
	flow = require('../config/flow-node.js')('tmp'),
	Book = require('../models/book.js'),
	fileBase = '../frontend/',
	imageDirectory = '../frontend/books/bookCovers/',
	linkDirectory = '../frontend/books/bookLinks/';

module.exports = function(router) {
	router.route('/admin/addBook').post(saveEpubData);
}

var saveEpubData = function (req, res, next) {
	
	flow.post(req, function(status, filename, original_filename, identifier) {
		 console.log('POST', status, original_filename, identifier);
		 console.log('STATUS:', status);
	});

	var epubTitle = 'orwell-animal-farm.epub';
	var epubPath = 'books/bookEpub/' + epubTitle;
	var imagePath = '';
	var epub = new Epub( fileBase + epubPath , imageDirectory, linkDirectory);
	epub.on('end', function() {
		imagePath = imageDirectory + epub.metadata.title + '.jpg';
		console.log(epub.metadata);
		epub.getImage(epub.metadata.cover, function (err, img, mimetype) {
			if (err) {
				return next(err);
			}
				fs.writeFile(imagePath, img, function (err) {
					if (err)
					{
				  	return next(err);
					}
					console.log(mimetype);
					console.log(epub.metadata.title + '.jpg' + ' Saved');
				});
		})
	});

		epub.on('end', function() {
		var book = new Book({
			name: epub.metadata.title,
			author: epub.metadata.creator,
			coverLocation: imagePath,
			text: epubPath
			// bio:
		})
		book.save(function saveBook(err, newBook) {
			if (err) {
				return next(err);
			}
			res.json(newBook).status(201);
		})

	});


	epub.parse();

}