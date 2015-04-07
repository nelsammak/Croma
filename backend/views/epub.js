var Epub = require('epub'),
	Book = require('../models/book.js'),
	fileBase = '../frontend/books/bookEpub/',
	image = '../frontend/books/bookCovers',
	link = '../frontend/books/bookLinks';
module.exports = function(router) {
	
	var epub = new Epub(fileBase + 'orwell-animal-farm.epub'
		, image, link);
	epub.on('end', function() {
		console.log(epub.metadata);
		epub.getImage(epub.metadata.cover, function (err, img, mimetype) {
			if (err) {
				console.log(err);
				return;
			}
			if(img) {
				console.log(img);
				console.log(mimetype);
			}
		})
	});

		epub.parse();

}

var saveEpubData = function (req, res, next) {
	
	var epub = new Epub(fileBase + 'orwell-animal-farm.epub'
		, image, link);
	epub.on('end', function() {
		var book = new Book({
			name: epub.metadata.title,
			author: epub.metadata.creator,
			coverLocation: epub.metadata.cover
			// bio:


		})
	});

	epub.parse();

}