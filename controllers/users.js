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
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}