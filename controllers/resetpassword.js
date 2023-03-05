const sgMail = require('@sendgrid/mail');
const User = require('../models/users')
require('dotenv').config();



const forgotpassword = async(req,res)=>{
    try {
       
        const {email} = req.body;
        
        const user = await User.findAll({where:{email}});
        const sender = {
            email:'kumarakshay2023@gmail.com'
        }
    sgMail.setApiKey(process.env.SEGRID_API_KEY);
    
        if(user){
            const msg = {
                to:email,
                from:sender.email,
                subject:'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
            }
          sgMail.send(msg).then((resp)=>{
            return res.status(resp[0].statusCode).json({msg:'Link to reset password sent to your mail',success:true})
          }).catch((err)=>{
            throw new Error(err);
          })
        }else{
            throw new Error('User doesnt exist');
        }
    } catch (error) {
      
         return res.json({message:error,sucess:false});
    }
}

module.exports={
    forgotpassword
}