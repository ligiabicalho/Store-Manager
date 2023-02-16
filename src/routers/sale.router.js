const express = require('express');
const { saleController } = require('../controllers');
const { isRequiredQuantity, isRequiredAndExistProductId } = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSale);

router.post('/', isRequiredQuantity, isRequiredAndExistProductId, saleController.createSale);

router.delete('/:id', saleController.deleteSale);

module.exports = router;