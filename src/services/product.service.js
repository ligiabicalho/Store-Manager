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
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNameProduct(name);
  if (error.type) return error;

  // envia objeto com apenas 1 dado, mas poderá escalar.
  const newProduct = await productModel.insertProduct({ name });

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, newName) => {
  const notFound = await getById(productId);
  if (notFound.type) return notFound;
  
  const invalidName = schema.validateNameProduct(newName);
  if (invalidName.type) return invalidName;

  const upProduct = await productModel.updateProduct(productId, newName);

  return { type: null, message: upProduct };
};

const deleteProduct = async (productId) => {
  const notFound = await getById(productId);
  if (notFound.type) return notFound;

  await productModel.deleteProduct(productId);

  return { type: null, message: '' }; // precisa de manter a chave message?
};
  
module.exports = { getAll, getById, createProduct, updateProduct, deleteProduct };