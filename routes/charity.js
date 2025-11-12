const express = require('express')
const router = express.Router();
const{fetch,add,charityDashboard, getCharityById}=require("../controller/Charity")
const authenticateUser=require('../middleware/auth')
const upload = require('../middleware/upload'); 
const checkRole= require('../middleware/role')

router.post('/add',authenticateUser,checkRole(['Charity']),upload.single('photo'),add)
router.get('/all',fetch)
router.get('/dashboard',authenticateUser,checkRole(['Charity']),charityDashboard)
router.get('/:id', getCharityById);



module.exports = router;