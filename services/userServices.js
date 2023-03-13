const getExpense = (req,where) =>{
   return req.user.getExpense(where);
}

module.exports = {
    getExpense
}