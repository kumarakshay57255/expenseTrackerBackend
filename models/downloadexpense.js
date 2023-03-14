const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

 const DownloadExpense = sequelize.define('downloadexpense',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    url:DataTypes.STRING,
 })


 module.exports =  DownloadExpense;
