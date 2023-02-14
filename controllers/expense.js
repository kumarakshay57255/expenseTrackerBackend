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