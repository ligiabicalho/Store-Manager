const express = require('express');
const { saleController } = require('../controllers');
const { isRequiredQuantity, isRequiredProductId, validateExistProducts } = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSale);

router.post('/',
  isRequiredQuantity,
  isRequiredProductId,
  // validateExistProducts,
  saleController.createSale);

router.delete('/:id', saleController.deleteSale);

router.put('/:id',
  isRequiredQuantity,
  isRequiredProductId,
  validateExistProducts,
  saleController.updateSale);

module.exports = router;