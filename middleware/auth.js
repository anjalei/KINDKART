const jwt= require('jsonwebtoken')
const User= require('../model/User')

const authenticateUser= async (req,res,next)=>{
    try{ const authHeader=req.headers['authorization'];
        if(!authHeader){
            return res.status(401).json({error:'No Token Provided'})
        }
const token = authHeader.split(' ')[1];
console.log("Token:", token);
const decoded = jwt.verify(token,process.env.JWT_SECRET);
const user= await User.findByPk(decoded.id)
if(!user){
    return res.status(401).json({error:'User Not Found'})
}
 req.user=user;
    next();
    }catch(err){
        return res.status(401).json({error:'Invalid Token'})
    } 
}
module.exports=authenticateUser;