const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Gallery schema
const gallerySchema = new Schema({
  title: { type: String, required: true },
  content: { type: [Schema.Types.ObjectId], ref: 'Photo', default: [] },      // image URLs or Base64
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  access: [{ type: Schema.Types.ObjectId, ref: 'User' }]  // empty = public
});

module.exports = mongoose.model('Gallery', gallerySchema);