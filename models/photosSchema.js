const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Photo schema
const photoSchema = new Schema({
  title: { type: String },
  tag: [{ type: String }],                       // optional photo tags
  url: { type: String, required: true },        // image URL or Base64
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  access: [{ type: Schema.Types.ObjectId, ref: 'User' }], // empty = public
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', photoSchema);