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

// Gallery schema
const gallerySchema = new Schema({
  title: { type: String, required: true },
  content: { type: [Schema.Types.ObjectId], ref: 'Photo', default: [] },      // image URLs or Base64
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  access: [{ type: Schema.Types.ObjectId, ref: 'User' }]  // empty = public
});

// User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String },
  galleries: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }] 
});

const User = mongoose.model('User', userSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Photo = mongoose.model('Photo', photoSchema);

module.exports = { User, Gallery, Photo };
