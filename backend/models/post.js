var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, required: true},
  title: { type: String, required: true},
  post: { type: String, default: ""},
  comments: {type: [Schema.Types.Mixed], default: []}
});

module.exports = mongoose.model('post', PostSchema);