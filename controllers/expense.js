const Expense = require('../models/expense');
const User = require('../models/users');

const addExpense = async (req,res)=>{
    try {
     const id = req.user.dataValues.id;
        const {expenseamount,category,description} = req.body;
        const expense =  await Expense.create({expenseamount,category,description,userId:id});
        const totalexpense = Number(req.user.dataValues.totalexpense) + Number(expenseamount)
          await User.update({totalexpense:totalexpense},{where:{id}})
         return res.status(200).json({expense,sucess:true});
    } catch (err) {
        
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
        
        const {id} = req.params;
          await Expense.destroy({where:{id}});
          return res.status(200).json({sucess:true,message: "Deleted Successfuly"})
    } catch (error) {
        return res.status(500).json({ success: true, message: "Failed"})
    }
}




module.exports={
    addExpense,
    getExpense,
    deleteExpense
}