
const services = require('../services/photos');
const upload = require('../midware/upload');
const photo = require('../models/photoSchema');
const photoSchema = require('../models/photoSchema');

const uploadPhoto = async (req, res) => {
    try {
     const { title,tags,accessList} = req.body;
     const filePath = req.file.path;
    const userid=req.user.id;
    
     const  newPhoto = await services.savePhotoMetadata(title, tags, filePath, accessList, userid);
     res.status(201).json({ message: "Photo uploaded successfully", photo: newPhoto });
    } catch (error) {
        res.status(500).json({ message: "Error uploading photo", error: error.message });
    }
}   ;

const deletePhoto = async (req, res) => {   
    try {
        const { id } = req.params;
        const userid=req.user.id;
        deletedPhoto = await services.deletePhoto(id,userid);
        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting photo", error: error.message });
    }
};

const editPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, tags, accessList } = req.body;
        const userid = req.user.id;
        if(!userid){
            return res.status(401).json({message: 'Missing authentication'})
        }
        const photo=await photoSchema.findById(id);
        if(!photo){
            return res.status(404).json({message: 'Photo is not exist'})
        }
        if(photo.owner.toString()!=userid){
            return res.status(403).json({message: 'You are not allowed to edit this photo'})
        }
        const updatePhoto = await services.editPhoto(id,title,tags,accessList);
        res.status(200).json({ message : "Photo updated successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error updating photo", error: error.message });
    }
};
const searchByUserPhotos=async(req,res)=>{
    const userid=req.user.id;
    if(!userid){
        return res.status(401).json({message: 'Missing autentication'})
    }
    const username=req.params.query;
    if(!username){
        return res.status(401).json({message: 'Missing quary'})
    }
    const photos=await services.searchByUserPhotos(userid, username);
    return res.status(200).json({photos: photos});
    
}
module.exports = { uploadPhoto, deletePhoto, editPhoto, searchByUserPhotos};