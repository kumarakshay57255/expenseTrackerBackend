const express = require('express');

const resetpasswordController = require('../controllers/resetpassword');
const router = express.Router();
const userAuthenticate = require('../middlewares/auth');

router.post('/forgotpassword',userAuthenticate.authenticate,resetpasswordController.forgotpassword);
router.post('/resetpassword/:id',userAuthenticate.authenticate,resetpasswordController.resetpassword);
router.put('/updatepassword/:id',userAuthenticate.authenticate,resetpasswordController.updatepassword)
module.exports = router;