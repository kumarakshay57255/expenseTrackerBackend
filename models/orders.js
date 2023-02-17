const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');


const Order = sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    paymentid:{
                type:DataTypes.STRING,
    },
    orderid:{
     type:DataTypes.STRING,
     },
     status:{
        type:DataTypes.STRING
     }
})


module.exports = Order;