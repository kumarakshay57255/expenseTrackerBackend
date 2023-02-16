const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

function generateAccessToken(id){
      return jwt.sign({userId:id},process.env.secret)
}

const signUp = async(req,res)=>{
    try {
        const {name,email,password}  = req.body;
        if(isstringinvalid(name) || isstringinvalid(email || isstringinvalid(password))){
            return res.status(400).json({err: "Bad parameters . Something is missing"})
        }
        const findEmail = await User.findOne({where:{email:email}});
        if(findEmail){
           res.status(200).json({sucess:true,message:'Email already exist'});
           return;
        }
        const saltrounds = 10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            await User.create({name,email,password:hash})
            res.status(200).json({sucess:true,message:'User signUp Successfully'});
        })

    
       
    } catch (error) {
        res.status(500).json(error);
    }
}
const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail id or password is missing ', success: false})
    }
  
    const user  = await User.findAll({ where : { email }})
   
        if(user.length > 0){
           bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
            throw new Error('Something went wrong')
           }
            if(result === true){
                return res.status(200).json({success: true, message: "User logged in successfully",token:generateAccessToken(user[0].id)});
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
    }catch(err){
        res.status(500).json({ err:err, success: false})
    }
}

module.exports={
    login,
    signUp
}