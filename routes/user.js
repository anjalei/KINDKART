const express = require('express')
const router = express.Router();
const{signUp,login}=require('../controller/User')
//const authenticateUser=require('../middleware/auth')

router.post('/signUp',signUp);
router.post('/login',login)

module.exports=router;