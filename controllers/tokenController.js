const jwt = require('jsonwebtoken');
const secret=process.env.JWT_SECRET
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
   return jwt.sign({id: user._id}, secret, {expiresIn: '1h'});
}

module.exports={authenticateJWT, generateToken};