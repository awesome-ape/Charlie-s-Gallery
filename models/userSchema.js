const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: {type:String, required: true},
  secondname:{type:String, required:true},
  profile_picture: { type: String },
  galleries: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }] 
});
module.exports = mongoose.model('User', userSchema);