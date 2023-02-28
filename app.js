const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')
const cors = require('cors')
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const User = require('./models/users');
const Order = require('./models/orders')
const Expense = require('./models/expense');
const app = express();
const leaderRouter =  require('./routes/leader');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseRoute);
app.use('/premium',leaderRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync({force:false}).then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
})
  

  
  app.listen(4400);