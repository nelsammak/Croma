var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

//Creating the Book Schema, the schema takes a JSON of the attributes of the Book Schema
var bookUserRatingSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  bookId: {type: Schema.Types.ObjectId, required: true},
  rating: {type: Number}
});

//exporting the Book model to use it in app.js
module.exports = Mongoose.model('bookuserrating', bookUserRatingSchema)
