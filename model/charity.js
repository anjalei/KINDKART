const{DataTypes,Sequelize}=require('sequelize')
const sequelize= require('../util/database')
const User=require('./User')

const Charity = sequelize.define('Charity',{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.TEXT,allowNull:true},
    goal:{type:DataTypes.FLOAT,allowNull:false,defaultValue:0},
    photo:{type:DataTypes.STRING,allowNull:true}
})
module.exports=Charity;