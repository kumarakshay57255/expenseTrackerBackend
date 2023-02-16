const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const userAuthenticate = require('../middlewares/auth');

router.post('/',userAuthenticate.authenticate,expenseController.addExpense);
router.get('/',userAuthenticate.authenticate,expenseController.getExpense);
router.delete('/:id',expenseController.deleteExpense);
module.exports = router;