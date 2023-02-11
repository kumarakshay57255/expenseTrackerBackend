const User = require('../models/users');

exports.postUsers = async(req,res)=>{
    try {
        const {name,email,password}  = req.body;
        const findEmail = await User.findOne({where:{email:email}});
        if(findEmail){
           res.status(200).send('Email already exist');
           return;
        }

        const data = await User.create({
            password,email,name
        })
        res.status(200).send('User signUp Successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.loginUser  = async (req,res)=>{
    try {
        const {email,password} = req.body;
         const user = await User.findOne({where:{email}});
         if(!user){
            return res.status(200).send('Email does not exist');
         }
        if(user.dataValues.password === password){
           return res.status(200).send('User login succesfully');
        }
        else{
            return res.status(200).send('Password not match');s
        }
    } catch (error) {
        res.status(500).send(error);
    }
}