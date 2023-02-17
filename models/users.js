const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const Users = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    ispremiumuser:{
        type:DataTypes.BOOLEAN,
        default:false
    }
})

module.exports = Users;