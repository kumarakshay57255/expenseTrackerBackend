const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/users');
require('dotenv').config();

const purchasePremium = async(req, res) => {
    try {
        let rzp = new Razorpay({
            key_id: process.env.rzp_key,
            key_secret: process.env.rzp_secret
        })

        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            })
           
        })
    } catch(err){
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

const updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
       
        const promise1 =  Order.update({ paymentid: payment_id, status: 'SUCCESSFUL'},{where:{orderid:order_id,userId:userId}}) ;
        const promise2 =  User.update({ ispremiumuser: true },{where:{id:userId}}) 

        Promise.all([promise1, promise2]).then(()=>{
            res.json({success:true,msg:'You are premium user now!'});
        })

        
                
    } catch (err) {
      
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}


module.exports={
    purchasePremium,
    updateTransactionStatus
}