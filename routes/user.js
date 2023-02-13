const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/signUp',userController.signUp);
router.post('/login',userController.login);
module.exports = router;