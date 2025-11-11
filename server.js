const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const sequelize = require('./util/database');
const User = require('./model/User')
const Charity=require('./model/Charity')
const Donation =require('./model/Donation')
const UserRoutes=require('./routes/user')
const charityRoutes=require('./routes/charity')
const donationRoutes = require('./routes/donation');
app.use('/donation', donationRoutes);
app.use('/user',UserRoutes);
app.use('/charity',charityRoutes);

 User.hasMany(Charity);
Charity.belongsTo(User);

User.hasMany(Donation);
Donation.belongsTo(User);



const port=3000;
sequelize.sync()
.then(()=>{
    app.listen(port,()=>{
        console.log("server running and sequelize connected!")
    })
})
.catch(err =>{
    console.error("error!",err)
})