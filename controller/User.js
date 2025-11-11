const User=require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signUp= async (req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        if(!name||!email||!password||!role){
            return res.status(400).json({message:'Please enter all fields!'})
        }
        const existingUser=await User.findOne({where:{email}})
        if(existingUser){
            return res.status(400).json({error:'User Already exists'})
        }
        const hashed=await bcrypt.hash(password,10)
        const newUser = await User.create({
                       name,
                       email,
                       password:hashed,
                       role
        })
        return res.status(201).json({message:'User signUp successfull!'})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
} 
exports.login= async(req,res)=>{
    try{
       const { email, password }=req.body;
       if(!email||!password){
        return res.status(400).json({error:'All fields required!'})
       }
       const user= await User.findOne({where:{email}})
       if(!user){
        return res.status(404).json({error:'User Not Found'})
       }
      const passwordMatch=await bcrypt.compare(password,user.password)
      if(!passwordMatch){
        return res.status(401).json({error:'Invalid Password'})
      }
      const token =  jwt.sign({
     id:user.id,
     email:user.email,
     role:user.role
      },process.env.JWT_SECRET,{expiresIn:'2h'});
      return res.status(200).json({message:'User login successful',
        token,
        user:{id:user.id,email:user.email,role:user.role}})
    }catch (err) {
    res.status(500).json({ message: "Server error" });
    }
}