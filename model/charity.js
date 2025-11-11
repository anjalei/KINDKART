const{DataTypes,Sequelize}=require('sequelize')
const sequelize= require('../util/database')
const User=require('../model/User')

const Charity = sequelize.define({
    id:{type:DataTypes.INTEGER,allowNull:false,PrimaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    description:{type:Text,allowNull:true},
    goal:{type:DataTypes.FLOAT,allowNull:false,defaultValue:0}
})