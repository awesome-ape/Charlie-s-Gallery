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

const getGalleryById = async(id) => {
  try{
  let gallery = await Gallery.findById(id);
  if (!gallery){
    throw new Error("no gallery with the given id found")
  }
  return gallery
}
catch(err){
  console.error("error fetching gallery",err);
  throw err;
}
}

const deleteGallery = async (ownerId, galleryId) => {
  try {
    const gallery = await getGalleryById(galleryId);
    const owner = gallery.owner.toString();

    if (owner !== ownerId.toString()) {
      throw new Error("Gallery isn't owned by user");
    }

    await gallery.deleteOne();
    console.log("Gallery deleted");
  } catch (err) {
    console.error("Failed to delete gallery:", err);
  }
};

const editGallery = async (ownerId, galleryId,title, toDelete = [], toAdd = []) => {
  try {
    const gallery = await getGalleryById(galleryId);
    const owner = gallery.owner.toString();

    if (owner !== ownerId.toString()) {
      throw new Error("Gallery isn't owned by user");
    }

    if (toDelete.length > 0) {
      gallery.content = gallery.content.filter(
        (photoID) => !toDelete.includes(photoID.toString())
      );
    }

    if (toAdd.length > 0) {
      gallery.content.push(...toAdd);
    }
    if(title){
      gallery.title = title
    }

    await gallery.save();
    console.log("Gallery edited successfully");
  } catch (err) {
    console.error("Failed to edit gallery:", err);
  }
};

module.exports = { createGallery, getGalleryById, deleteGallery, editGallery };

