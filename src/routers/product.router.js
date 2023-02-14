const express = require('express');
const { productController } = require('../controllers');
const validateProductField = require('../middlewares/validateProductField');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', validateProductField, productController.createProduct);

module.exports = router;