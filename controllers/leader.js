const User = require('../models/users')


const showleader = async (req,res)=>{
    try {
         let users =  await User.findAll({
            attributes:['name','totalexpense'],
            order:[['totalexpense','DESC']]
            
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