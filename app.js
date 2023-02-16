const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')
const cors = require('cors')
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const User = require('./models/users');
const Expense = require('./models/expense');
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/',userRouter);
app.use('/expense',expenseRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
})
  

  
  app.listen(4400);