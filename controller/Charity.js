const Charity = require('../model/Charity')

exports.fetch=async(req,res)=>{
    try{
       const charities= await Charity.findAll();
         res.status(200).json(charities);
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}
exports.add=async(req,res)=>{
    try{
        const {name,description,goal}=req.body;
        const photoPath= req.file ? req.file.path : null; 
        if(!name){
            return res.status(400).json({error:"Name Required!"})
        }
        const newCharity= await Charity.create({
            name,
            description,
            goal,
            photo:photoPath,
            userId: req.user.id 
        })
        return res.status(201).json({message:'Created Successfully!',newCharity})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}