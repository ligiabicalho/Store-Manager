const express = require('express');
const { saleController } = require('../controllers');
const { isRequiredQuantity,
  isRequiredProductId } = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSale);

router.post('/',
  isRequiredQuantity,
  isRequiredProductId,
  saleController.createSale);

router.delete('/:id', saleController.deleteSale);

router.put('/:id',
  isRequiredQuantity,
  isRequiredProductId,
  saleController.updateSale);

module.exports = router;