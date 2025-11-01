const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const PhotoSchema = require('../models/photoSchema');
const cloud = require('cloudinary').v2;

const folder = "./uploads";
const userSchema=require('../models/userSchema');
const photoSchema = require('../models/photoSchema');
// Configure Cloudinary
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Upload image to Cloudinary
async function uploadToCloudinary(imagePath) {
  try {
    const result = await cloud.uploader.upload(imagePath, {
      folder: "img_storage",
      use_filename: true,
    });
    return result;
  } catch (error) {
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
}

function getPublicIdFromUrl(url) {
  // Example URL:
  // https://res.cloudinary.com/dbmvcljk8/image/upload/v1761407199/img_storage/1761407198494-test_y4d83v.jpg
  const parts = url.split('/');
  const fileWithExt = parts.pop(); // "1761407198494-test_y4d83v.jpg"
  const file = fileWithExt.split('.')[0]; // "1761407198494-test_y4d83v"
  
  // Find the "upload" segment and skip the version if present
  const uploadIndex = parts.indexOf('upload');
  let folderParts = parts.slice(uploadIndex + 1);

  // Remove the version if it starts with "v" + digits
  if (folderParts[0].match(/^v\d+$/)) folderParts.shift();

  const folder = folderParts.join('/'); // "img_storage"
  return folder + '/' + file; // "img_storage/1761407198494-test_y4d83v"
}

async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloud.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
  } catch (error) {
    throw new Error("Error deleting from Cloudinary: " + error.message);
  }
}

async function deletePhoto(objectId,userid) {
  try {
    const photo = await PhotoSchema.findById(objectId).select('url');
    if (!photo) throw new Error("Photo not found");
    const publicId = getPublicIdFromUrl(photo.url);
    console.log("Photo deleted from Cloudinary:", publicId);
    await deleteFromCloudinary(publicId);
    await PhotoSchema.findByIdAndDelete(objectId);
    const user= await userSchema.findById(userid);
    user.photos=user.photos.filter(id=> objectId.toString()!=id.toString());
    await user.save();
  
  } catch (error) {
    throw new Error("Error deleting photo: " + error.message);
  }
};

// Save photo metadata to MongoDB
async function savePhotoMetadata(title, tags, filePath, accessList, userid) {
  //upload to claudinary returns 
  let uploadResult;
  try {
    uploadResult = await uploadToCloudinary(filePath);
  } catch (error) {
    throw new Error("Error uploading photo: " + error.message);
  }

  const newPhoto = new PhotoSchema({
    title,
    tag: tags,
    url: uploadResult.secure_url,
    owner: userid,
    access: accessList
  });

  await newPhoto.save();
  await userSchema.findByIdAndUpdate(userid, { $push: { photos: newPhoto._id } });


  // Clean local uploads folder
  for (const file of fs.readdirSync(folder)) {
    fs.rmSync(path.join(folder, file), { recursive: true, force: true });
  }

  return newPhoto;
}

const findPhotosByOwner = async (ownerId) => {
  try {
    const photos = await PhotoSchema.find({ owner: ownerId });
    return photos;
  } catch (error) {
    throw new Error("Error retrieving photos: " + error.message);
  }
};

const findPhotosByUrl = async (url) => {
  try {
    const photos = await PhotoSchema.findOne({ url: url });
    return photos;
  } catch (error) {
    throw new Error("Error retrieving photos: " + error.message);
  }
};

const editPhoto = async (id, title, tags, accessList) => {
  try {
    let photo = await PhotoSchema.findById(id);
    if (!photo) throw new Error("Photo not found");

    photo.title = title || photo.title;
    photo.tag = tags || photo.tag;
    photo.access = accessList || photo.access;

    await photo.save();
  } catch (error) {
    throw new Error("Error editing photo: " + error.message);
  }
};

module.exports = { uploadToCloudinary, savePhotoMetadata, deletePhoto, getPublicIdFromUrl, findPhotosByOwner, findPhotosByUrl, 
  editPhoto};
