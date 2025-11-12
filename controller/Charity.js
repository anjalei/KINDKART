const Charity = require('../model/Charity')
const Donation = require('../model/Donation')
const User = require('../model/User')
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
exports.charityDashboard = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { charityId: req.user.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCharityById = async (req, res) => {
  try {
    const charity = await Charity.findByPk(req.params.id, {
      attributes: ['id', 'name', 'description', 'goal', 'photo'],
      include: [{
        model: Donation,
        attributes: ['amount']
      }]
    });

    if (!charity) return res.status(404).json({ error: 'Charity not found' });

    // Calculate total donations
    const totalDonations = charity.Donations.reduce((sum, d) => sum + d.amount, 0);

    res.status(200).json({
      id: charity.id,
      name: charity.name,
      description: charity.description,
      goal: charity.goal,
      photo: charity.photo,
      totalDonations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
