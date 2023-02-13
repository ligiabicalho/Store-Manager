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
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNameProduct(name);
  if (error.type) return error;

  // envia objeto com apenas 1 dado, mas poderá escalar.
  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.getById(newProductId);

  return { type: null, message: newProduct };
};
  
module.exports = { getAll, getById, createProduct };