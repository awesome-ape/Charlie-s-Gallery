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

module.exports = { createGallery };