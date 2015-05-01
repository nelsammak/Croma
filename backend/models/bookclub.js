var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookClubsSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, required: true},
  name: {type: String},
  posts: {type: Array, default: []},
  users: {type: Array, default: []}
});

module.exports = mongoose.model('bookClub', BookClubsSchema);