const express = require('express');
const { productController } = require('../controllers');
const { validateName } = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', validateName, productController.createProduct);

module.exports = router;