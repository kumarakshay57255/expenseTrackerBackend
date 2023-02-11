const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/signUp',userController.postUsers);
router.post('/login',userController.loginUser);
module.exports = router;