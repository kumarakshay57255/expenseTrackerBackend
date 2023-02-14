const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');

router.post('/',expenseController.addExpense);
router.get('/',expenseController.getExpense);
module.exports = router;