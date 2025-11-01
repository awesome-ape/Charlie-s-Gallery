const jwt = require('jsonwebtoken');
require('custom-env').env(process.env.NODE_ENV, './config');
const secret=process.env.JWT_SECRET
console.log(secret);
const authenticateJWT=(req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader)
    {
        return res.status(401).json({message: 'Authorization hesder missing'});
    }
    const token= authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Token missing'})
    }
    try{
        const decoded=jwt.verify(token, secret);
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(403).json({message: 'Invalid or expired token'});
    }

}
const generateToken=(user)=>{
    console.log(secret);
   return jwt.sign({id: user._id}, secret, {expiresIn: '5h'});
}

module.exports={authenticateJWT, generateToken};