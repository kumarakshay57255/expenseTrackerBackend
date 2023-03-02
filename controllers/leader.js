const User = require('../models/users')
const Expense = require('../models/expense');
const sequelize = require('../utils/database');

const showleader = async (req,res)=>{
    try {
         let users =  await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.expenseamount')),'totalcost']],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['users.id'],
            order:[['totalcost','DESC']]
         });


          // Brute force methodss
    //      let usersexpenses = {};
    //      expense.map((ele)=>{
    //         if(usersexpenses[ele.userId]){
    //             usersexpenses[ele.userId] = usersexpenses[ele.userId]+ele.expenseamount;
    //         }
    //         else{
    //             usersexpenses[ele.userId] = ele.expenseamount;
    //         }
           
    //      })
    //     let userdetailes = [];
    //      users.map((user)=>{
         
    //         userdetailes.push({name:user.name,totalcost:usersexpenses[user.id]})
    //      })
    //  userdetailes.sort((a,b)=>{
    //    b.totalcost-a.totalcost;
    //  })

    //  console.log(userdetailes);
       return res.status(200).json(users);

    } catch (error) {
        console.log(error);
          return res.status(500).json({success:false,err:error});
    }
    }


    module.exports={
        showleader
    }