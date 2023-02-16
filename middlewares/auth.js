const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const authenticate  = async(req,res,next) =>{
    try {
        const token  = req.header('Authorization');
         const user = jwt.verify(token,process.env.secret);
         const {userId} = user;
    
         const resp = await User.findByPk(userId)
         req.user = resp;
         next();
    } catch (error) {
        return res.status(401).json({success:false});
    }
}

module.exports={
    authenticate
}