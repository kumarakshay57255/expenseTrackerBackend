const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expenses',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    expenseamount:DataTypes.INTEGER,
    category:DataTypes.STRING,
    description:DataTypes.STRING
})

module.exports = Expense;