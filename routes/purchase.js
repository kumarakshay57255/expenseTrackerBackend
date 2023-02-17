const express = require('express');

const purchaseController = require('../controllers/purchase');

const userAuthenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/updatetransactionstatus',userAuthenticate.authenticate,purchaseController.updateTransactionStatus);
router.get('/premiummembership', userAuthenticate.authenticate,purchaseController.purchasePremium);



module.exports = router;