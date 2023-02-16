const express = require('express');
const { productController } = require('../controllers');
const { isRequiredName, validateExistProductId } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', isRequiredName, productController.createProduct);

router.put('/:id', isRequiredName, validateExistProductId, productController.updateProduct);

module.exports = router;