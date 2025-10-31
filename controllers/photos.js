
const services = require('../services/photos');
const upload = require('../midware/upload');
const photo = require('../models/photoSchema');



const uploadPhoto = async (req, res) => {
    try {
     const { title,tags,ownerId,accessList} = req.body;
     const filePath = req.file.path;

     const  newPhoto = await services.savePhotoMetadata(title, tags, filePath, ownerId, accessList);
     res.status(201).json({ message: "Photo uploaded successfully", photo: newPhoto });
    } catch (error) {
        res.status(500).json({ message: "Error uploading photo", error: error.message });
    }
}   ;

const deletePhoto = async (req, res) => {   
    try {
        const { id } = req.params;
        deletedPhoto = await services.deletePhoto(id);
        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting photo", error: error.message });
    }
};

const editPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, tags, accessList } = req.body;
        const updatePhoto = await services.editPhoto(id,title,tags,accessList);
        res.status(200).json({ message : "Photo updated successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error updating photo", error: error.message });
    }
};

module.exports = { uploadPhoto, deletePhoto, editPhoto };