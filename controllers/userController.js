const userServices = require('../services/userServices');
const tokenController=require('../controllers/tokenController');
const photoServices=require('../services/photos');
const register = async (req, res) => {
  const { username, firstname, secondname, password } = req.body;
  const profileImage=req.file.path;
  if(!profileImage){
    return res.status(400).json({message: 'Missing profile image'});
  }
  const missingFields = [];
  if (!username) missingFields.push('username');
  if (!firstname) missingFields.push('firstname');
  if (!secondname) missingFields.push('secondname');
  if (!password) missingFields.push('password');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }  
  try {
    const newUser = await userServices.register(password, username, firstname, secondname);
    if (!newUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const userId=newUser._id;
    const  newPhoto = await photoServices.savePhotoMetadata('profile image', [], profileImage, [], userId);
    await userServices.saveProfileImage(userId, newPhoto.url);
    res.status(201).json(newUser); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
const login=async(req,res)=>{
    const {password, username}= req.body;
    if(!username){
        return res.status(401).json({message:'username missing'});
    }
    if(!password){
                return res.status(401).json({message:'password missing'});

    }
   const user=await userServices.getUserByUsernameAndPassword(username, password);
   if(!user){
    return res.status(401).json({message: 'Incorrect userName or password'});
   }
   const token=tokenController.generateToken(user);
  return res.json({message: 'login successful', token});
}

const getUserProfile=async(req,res)=>{
    const id=req.user.id;
    if(!id){
        res.status(401).json({message: 'Missing user id'});
    }
   const user= await userServices.getUserById(id);
   if(!user){
       return res.status(401).json({message: 'No user with this id'});
   }
   return res.status(200).json(user);

}
module.exports = { register,login, getUserProfile };
