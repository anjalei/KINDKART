const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.json());

const sequelize = require('./util/database');
const User = require('./model/User')
const UserRoutes=require('./routes/user')
app.use('/user',UserRoutes);

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