const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('expense','root','',{
    dialect:process.env.dialect,
})

module.exports = sequelize;