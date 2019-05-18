const express = require('express');
const { getWalletData } = require('../controllers/wallets');

const router = express.Router();

router.get('/wallets/:address', getWalletData);

module.exports = router;
