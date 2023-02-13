const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

module.exports = router;