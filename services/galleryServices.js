const Gallery = require('../models/gallerySchema');
const User = require('../models/userSchema');

const createGallery = async (ownerId, title, content = [], accessList = []) => {
  try {
    const gallery = new Gallery({
      title,
      content,
      access: accessList,
      owner: ownerId,
    });

    await gallery.save();
    await User.findByIdAndUpdate(ownerId,{$push:{galleries:gallery._id}});
    return gallery.toJSON()
}
catch(err){
console.error(err);
throw err
}
};


module.exports = { createGallery };
