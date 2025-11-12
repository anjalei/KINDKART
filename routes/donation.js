const express = require('express')
const router = express.Router();
const{createOrder,verifyPayment,history,handleWebhook}=require('../controller/Donation')
const authenticateUser=require('../middleware/auth');
const checkRole= require('../middleware/role');

router.post('/create-order', authenticateUser,checkRole(['Donor']), createOrder);
router.post('/verify', authenticateUser, verifyPayment);
router.get('/history',authenticateUser,history)
router.post('/webhook', express.json({ type: 'application/json' }),handleWebhook);


module.exports = router;
