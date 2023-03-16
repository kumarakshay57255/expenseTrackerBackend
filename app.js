const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')
const cors = require('cors')
const helmet  = require('helmet');
const compression  = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const resetPasswordRoute = require('./routes/resetpassword');
const leaderRoute =  require('./routes/leader');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),{flags:'a'}
)

const Users = require('./models/users');
const Order = require('./models/orders')
const Expense = require('./models/expense');
const ForgotPassword = require('./models/forgotpassword');
const DownloadExpense = require('./models/downloadexpense');
const app = express();



app.use(helmet());
app.use(compression())
app.use(morgan('combined',{stream:accessLogStream}))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/',userRoute);
app.use('/expense',expenseRoute);
app.use('/purchase',purchaseRoute);
app.use('/premium',leaderRoute);
app.use('/password',resetPasswordRoute);



Users.hasMany(Expense);
Expense.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(ForgotPassword);
ForgotPassword.belongsTo(Users);

Users.hasMany(DownloadExpense);
DownloadExpense.belongsTo(Users)

sequelize.sync({force:false}).then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
})
  
const PORT = process.env.PORT||4400
  
  app.listen(PORT);