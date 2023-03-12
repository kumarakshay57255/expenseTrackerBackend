const sgMail = require('@sendgrid/mail');
const User = require('../models/users')
const ForgotPassword = require('../models/forgotpassword');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();



const forgotpassword = async(req,res)=>{
    try {
       
        const {email} = req.body;
        console.log("hellow")
        const user = await User.findAll({where:{email}});
        const sender = {
            email:'kumarakshay2023@gmail.com'
        }
    sgMail.setApiKey(process.env.SEGRID_API_KEY);
  
        if(user){
            const id = uuid.v4();
          await ForgotPassword.create({id,active:true,userId:req.user.id});
            const msg = {
                to:email,
                from:sender.email,
                subject:'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:4400/password/resetpassword/${id}">Reset password</a>`,
            }
          sgMail.send(msg).then((resp)=>{
            return res.status(resp[0].statusCode).json({msg:'Link to reset password sent to your mail',success:true})
          }).catch((err)=>{
            console.log(err);
            throw new Error(err);
          })
        }else{
            throw new Error('User doesnt exist');
        }
    } catch (error) {
      console.log(error)
         return res.json({message:error,sucess:false});
    }
}

const resetpassword = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = ForgotPassword.findOne({where:{id}});
        if(data){
          await ForgotPassword.update({active:false})
          res.status(200).send(`<html>
          <script>
              function formsubmitted(e){
                  e.preventDefault();
                  console.log('called')
              }
          </script>
          <form action="/password/updatepassword/${id}" method="get">
              <label for="newpassword">Enter New password</label>
              <input name="newpassword" type="password" required></input>
              <button>reset password</button>
          </form>
      </html>`
      )
      res.end()
        }
    } catch (error) {
      return res.json({message:error,sucess:false});
    }
}

const updatepassword = async(req,res)=>{
  try {
     const {newpassword} = req.query;
     const {resetpassword} = req.params;
     const data = await ForgotPassword.findAll({where:{id:resetpassword}});
     if(data){
      const user = await User.findAll({where:{id:data.resetpasswordrequest.userId}});
      if(user){
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds,(err,salt)=>{
          if(err){
            console.log(err);
            throw new Error(err);
          }
        })
        bcrypt.hash(newpassword,salt,async(err,hash)=>{
          if(err){
            console.log(err);
            throw new Error(err);
          }
        await User.update({password:hash});
         res.status(201).json({message:"Successfully updated new password"}); 
        })
      }
      else{
        return res.status(404).json({error:"No user Exists",success:false})
      }
     }
  } catch (error) {
     return res.status(403).json({error,success:false});
  }
}


module.exports={
    forgotpassword,
    resetpassword,
    updatepassword
}