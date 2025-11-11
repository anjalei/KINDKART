const express = require('express')
const router = express.Router();
const{fetch,add}=require("../controller/Charity")
const authenticateUser=require('../middleware/auth')
const upload = require('../middleware/upload'); 

router.post('/add',authenticateUser,upload.single('photo'),add)
router.get('/all',fetch)

module.exports = router;