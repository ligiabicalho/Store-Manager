const express = require('express');
const { productController } = require('../controllers');
const { isRequiredName } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', isRequiredName, productController.createProduct);

router.put('/:id', isRequiredName, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;