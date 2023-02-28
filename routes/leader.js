const express = require('express');
const router = express.Router();
const userAuthenticate = require('../middlewares/auth');
const leaderController = require('../controllers/leader');

router.get('/showleader',userAuthenticate.authenticate,leaderController.showleader);

module.exports = router;



