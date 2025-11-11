const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');
const Charity = require('./Charity');

const Donation = sequelize.define('Donation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    paymentId: { type: DataTypes.STRING, allowNull: false }
});
module.exports=Donation;