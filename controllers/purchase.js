const Razorpay = require('razorpay');
const Order = require('../models/orders');
require('dotenv').config();

const purchasePremium = async(req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.rzp_key,
            key_secret: process.env.rzp_secret
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            console.log('order--->',order);
            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
       console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

const updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id} = req.body;
        console.log('payment_id--->',payment_id,'order id--->',order_id)
        const order  = await Order.findOne({where : {orderid : order_id}}) 
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremiumuser: true }) 
     console.log('order----->',order);
        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}


module.exports={
    purchasePremium,
    updateTransactionStatus
}