const express = require('express')
const router = express.Router();
const{signUp,login,profile}=require('../controller/User');
const authenticateUser = require('../middleware/auth');


router.post('/signUp',signUp);
router.post('/login',login);
router.get('/profile',authenticateUser,profile)


module.exports=router;