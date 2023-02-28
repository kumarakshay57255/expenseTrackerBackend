const User = require('../models/users')
const Expense = require('../models/expense');

const showleader = async (req,res)=>{
    try {
         let users =  await User.findAll();
         let expense = await Expense.findAll();
         let usersexpenses = {};
         expense.map((ele)=>{
            if(usersexpenses[ele.userId]){
                usersexpenses[ele.userId] = usersexpenses[ele.userId]+ele.expenseamount;
            }
            else{
                usersexpenses[ele.userId] = ele.expenseamount;
            }
           
         })
        let userdetailes = [];
         users.map((user)=>{
         
            userdetailes.push({name:user.name,totalcost:usersexpenses[user.id]})
         })
     userdetailes.sort((a,b)=>{
       b.totalcost-a.totalcost;
     })

     
       return res.status(200).json(userdetailes);

    } catch (error) {
          return res.status(500).json({success:false,err:error});
    }
    }


    module.exports={
        showleader
    }