const services = require('../services/galleryServices')
const schema = require('../models/gallerySchema')

const createGallery = async (req,res) =>{
    try{
        const ownerId = req.user.id
        const {title,content,accessList} = req.body
        const newGallery = await services.createGallery(ownerId,title,content,accessList)
         res.status(201).json({ message: "Gallery created"});
    } catch (error) {
        res.status(500).json({ message: "Error creating gallery", error: error.message });
    }
}   ;
const deleteGallery = async (req,res) =>{
    try {
        const ownerId = req.user.id
        const galleryId = req.params.id
        await services.deleteGallery(ownerId,galleryId)
        res.status(200).json({message : "Gallery deleted"})
    }
    catch(err){
        res.status(500).json({message : "Gallery deletion failed"})
    }
}

const editGallery = async (req,res) => {
    try{
        const ownerId = req.user.id
        const galleryId = req.params.id
        const {title,toDelete,toAdd} = req.body
        await services.editGallery(ownerId,galleryId,title,toDelete,toAdd)
        res.status(200).json({message : "Gallery edited"})
    }
    catch(err){
        res.status(500).json({message : "Gallery edit operation failed"})
    }
}
module.exports = { createGallery,deleteGallery,editGallery };