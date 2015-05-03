var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookClubsSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, required: true},
  name: {type: String},
  posts: {type: [Schema.Types.Mixed], default: []},
  users: {type: [Schema.Types.ObjectId], default: []}
});

module.exports = mongoose.model('bookClub', BookClubsSchema)