const Expense = require('../models/expense');
const User = require('../models/users');
const AWS  = require('aws-sdk');
const sequelize = require('../utils/database');
require('dotenv').config();
let t;

async function uploadToS3(data,filename){
    const BUCKET_NAME = 'expensetrac';
    const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
    const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
 
        let params = {
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
       return new Promise((resolve,reject)=>{
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err);
            }
            else {
                resolve(s3response.Location);
            }
        })
        })
      
    

}

const addExpense = async (req,res)=>{
 
    try {
        t = await sequelize.transaction();  
     const id = req.user.dataValues.id;
        const {expenseamount,category,description} = req.body;
        const expense =  await Expense.create({expenseamount,category,description,userId:id},{transaction:t});
        const totalexpense = Number(req.user.dataValues.totalexpense) + Number(expenseamount)
          await User.update({totalexpense:totalexpense},{where:{id},transaction:t},);
        await t.commit();
         return res.status(200).json({expense,sucess:true});
    } catch (err) {
         await  t.rollback();
        res.status(500).json({sucess:false,error:err});
    }
}

const getExpense = async (req,res)=>{
    try {
        
        const id = req.user.dataValues.id;
        const expense = await Expense.findAll({where:{userId:id}});
        return res.status(200).json({expense,sucess:true});
    } catch (error) {
        res.status(500).json({sucess:false,error:err});
    }
}

const deleteExpense = async (req,res) =>{
    try {
         t= await sequelize.transaction();
        const {id} = req.params;
          const expense = await Expense.findAll({where:{id},transaction:t});
          const userId = expense[0].userId;
         const totalexpense = Number(req.user.dataValues.totalexpense)-Number(expense[0].expenseamount);
         await User.update({totalexpense,transaction:t},{where:{id:userId}});
         await Expense.destroy({where:{id},transaction:t});
    
       
        // console.log('id---->',id);
        // const expense = await Expense.findAll({where:{id}});
        // console.log('expense--->',expense)
        //   const users = await User.findAll();
        //   console.log('user---->',users);
        //   await Expense.destroy({where:{id}});
            await t.commit();
          return res.status(200).json({sucess:true,message: "Deleted Successfuly"})
    } catch (error) {
        console.log(error);
        await t.rollback();
        return res.status(500).json({ success: true, message: "Failed"})
    }
}

const downloadExpense = async(req,res)=>{
    try {
        const {ispremiumuser} = req.user;
         if(!ispremiumuser){
            return res.status(401).json({sucess:false,message:"User is not a premium User"})
         }
         const expenses = await Expense.findAll();
         const stringifiedExpenses = JSON.stringify(expenses);
         const userId = req.user.id;

         const filename = `Expense${userId}/${new Date().toLocaleDateString()}.txt`;
         const fileURL =  await uploadToS3(stringifiedExpenses,filename);
         console.log(fileURL)
          res.status(200).json({fileURL,sucess:true})
    } catch (error) {
        return res.status(500).json({sucess:false,error});
    }
}


module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpense
}