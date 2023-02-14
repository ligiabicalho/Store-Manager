const express = require('express');
const { saleController } = require('../controllers');
const { validateQuantity } = require('../middlewares/validateSale');
const { validateProductId } = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/', validateQuantity, validateProductId, saleController.createSale);

module.exports = router;