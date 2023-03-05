const express = require('express');

const resetpasswordController = require('../controllers/resetpassword');
const router = express.Router();
const userAuthenticate = require('../middlewares/auth');

router.post('/forgotpassword',userAuthenticate.authenticate,resetpasswordController.forgotpassword);

module.exports = router;