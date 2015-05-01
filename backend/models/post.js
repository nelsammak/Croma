var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, required: true},
  title: { type: String, required: true},
  comments: {type: Array}
});

module.exports = mongoose.model('post', PostSchema);