const userSchema = require('../models/userSchema');
const User=require('../models/userSchema');
const bcrypt= require('bcrypt');
const saltRound=10;
const register=async(password, username, firstname, secondname)=>{
    const user=await User.findOne({username: username});
    if(user){
        return null;
    }
    const hashedPassword=await bcrypt.hash(password, saltRound);
    let newUser=new User({username,password: hashedPassword, firstname, secondname});
    newUser=await newUser.save();
    const userToJSON=newUser.toJSON();
    delete userToJSON.password;
    return userToJSON;
}
const getUserByUsernameAndPassword= async(username,password)=>{
    const user= await User.findOne({username: username});
    if(!user){
        return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return null;
    }
    const userToJSON=user.toJSON();
    delete userToJSON.password;
    return userToJSON;

}
const getUserById=async (id)=>{
    const user=await User.findById(id);
    if(!user){
        return null;
    }
    const userToJSON=user.toJSON();
    delete userToJSON.password;
    return userToJSON;
}
const getUserByUserName=async(username)=>{
  const user= await User.findOne({username: username});
  if(!user)
    return null;
 const userToJSON=user.toJSON();
 delete userToJSON.password;
 return userToJSON;
}
const saveProfileImage=async(userId, url)=>{
   await userSchema.findByIdAndUpdate(userId, {profile_picture:url});
}
module.exports={register, getUserByUsernameAndPassword, getUserById, getUserByUserName, saveProfileImage};