const Expense = require('../models/expense');

const addExpense = async (req,res)=>{
    try {
        const {expenseamount,category,description} = req.body;
        const expense =  await Expense.create({expenseamount,category,description});
         return res.status(200).json({expense,sucess:true});
    } catch (err) {
        
        res.status(500).json({sucess:false,error:err});
    }
}

const getExpense = async (req,res)=>{
    try {
        const expense = await Expense.findAll();
        return res.status(200).json({expense,sucess:true});
    } catch (error) {
        res.status(500).json({sucess:false,error:err});
    }
}

module.exports={
    addExpense,
    getExpense
}