const express = require('express');
const purchaseController = require('../controllers/purchase');
const userAuthenticate = require('../middlewares/auth');
const leaderController = require('../controllers/leader');

const router = express.Router();

router.post('/updatetransactionstatus',userAuthenticate.authenticate,purchaseController.updateTransactionStatus);
router.get('/premiummembership', userAuthenticate.authenticate,purchaseController.purchasePremium);
router.get('/showleader',leaderController.showleader);



module.exports = router;