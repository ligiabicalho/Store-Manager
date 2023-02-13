const { productModel } = require('../models');
const schema = require('./validations/validationsValues');

const getAll = async () => {
  const products = await productModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.getById(productId);
  console.log('product service', !product);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};
  
module.exports = { getAll, getById };