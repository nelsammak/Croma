var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, required: true},
  title: { type: String, required: true},
  comments: {type: Array}
});