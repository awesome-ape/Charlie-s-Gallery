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
const getUserById=(id)=>{
    const user=User.find({_id: id});
    if(!user){
        return null;
    }
    const userToJSON=user.toJSON();
    delete userToJSON.password;
    return userToJSON;
}
module.exports={register, getUserByUsernameAndPassword, getUserById};