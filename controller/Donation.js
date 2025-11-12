const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../model/Donation'); 
const Charity = require('../model/Charity');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


exports.createOrder = async (req, res) => {
    try {
        const { amount, charityId } = req.body; 
        if (!amount || !charityId) return res.status(400).json({ error: "Amount and charityId required" });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
    userId: req.user.id,
    charityId
  }
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, charityId, userId, amount } = req.body;

        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
           
            const donation = await Donation.create({
                amount,
                userId,
                charityId,
                paymentId: razorpay_payment_id,
                status: 'SUCCESS'
            });
            const charity = await Charity.findByPk(charityId);
            if (charity) {
                charity.goal = charity.goal + amount; 
                await charity.save();
            }

            return res.status(200).json({ success: true, donation });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.history = async (req,res)=>{
    try{
      const donationHistory= await Donation.findAll({where:{userId:req.user.id},
      attributes: ['amount', 'createdAt'], 
      include: [
        {
          model: Charity,
          attributes: ['name'] 
        }
      ],
      order: [['createdAt', 'DESC']]
    });
      if(!donationHistory|| donationHistory.length === 0){
        return res.status(404).json({message:"No Donation History For This User"})
      }
      return res.status(200).json(donationHistory)
    }catch (err) {
        return res.status(500).json({ error: err.message });
    }
}



exports.handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET; 
    const shasum = crypto.createHmac('sha256', secret)
                         .update(JSON.stringify(req.body))
                         .digest('hex');

    if (shasum !== req.headers['x-razorpay-signature']) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body.event;

    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;

      const donation = await Donation.create({
        amount: payment.amount / 100, 
        userId: payment.notes.userId, 
        charityId: payment.notes.charityId, 
        paymentId: payment.id,
        status: 'SUCCESS'
      });

      
      const charity = await Charity.findByPk(payment.notes.charityId);
      if (charity) {
        charity.goal += payment.amount / 100;
        await charity.save();
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
