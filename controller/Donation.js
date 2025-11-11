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
