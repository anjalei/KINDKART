const express = require('express')
const router = express.Router();
const{createOrder,verifyPayment}=require('../controller/Donation')
const authenticateUser=require('../middleware/auth')

router.post('/create-order', authenticateUser, createOrder);
router.post('/verify', authenticateUser, verifyPayment);

module.exports = router;
