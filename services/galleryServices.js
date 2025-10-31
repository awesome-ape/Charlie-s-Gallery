const Gallery=require('../models/gallerySchema');
const User=require('../models/userSchema');
const createGallery=async(userid, title)=>{
    try{
    let newGallery=  new Gallery({title, owner: userid, content: [], access: []});
    await newGallery.save();
    await User.findByIdAndUpdate(userid, {$push: {galleries: newGallery._id}});
    return newGallery.toJSON();
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
module.exports={createGallery};