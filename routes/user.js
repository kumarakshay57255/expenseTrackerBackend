const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userAuthenticate = require('../middlewares/auth');
const expenseController = require('../controllers/expense');

router.post('/signUp',userController.signUp);
router.post('/login',userController.login);
router.get('/download', userAuthenticate.authenticate,expenseController.downloadExpense)
module.exports = router;