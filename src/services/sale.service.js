const { saleModel } = require('../models');
const schema = require('./validations/validationsValues');
const productService = require('./product.service');

const getAll = async () => {
  const sales = await saleModel.getAll();
  return { type: null, message: sales };
};

const getById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.getById(saleId);
  if (sale.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

// validateExistProducts
const getProductsById = async (items) => {
  const errors = await Promise.all(items.map(async (item) => {
    const notFound = await productService.getById(item.productId); // retorna { type, message }
    if (notFound.type) return 'error';
  }));

  if (errors.some((e) => e === 'error')) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const createSale = async (itemsSold) => {
  const invalidQuantity = schema.validateQuantitys(itemsSold);
  if (invalidQuantity.type) return invalidQuantity;
  
  const notFoundProduct = await getProductsById(itemsSold); /* não é um schema, acessa bd */ 
  console.log('CREATE SALE SERVICE notFoundProduct', notFoundProduct);
  if (notFoundProduct.type) return notFoundProduct;

  const newSaleId = await saleModel.insertSale();
  const insertedSale = await Promise.all(itemsSold.map((item) =>
    saleModel.insertSaleProducts(newSaleId, item)));

  return {
    type: null,
    message: { id: newSaleId, itemsSold: insertedSale },
  };
};

const deleteSale = async (saleId) => {
  const notFound = await getById(saleId);
  if (notFound.type) return notFound;

  await saleModel.deleteSale(saleId);

  return { type: null, message: '' };
};

const updateSale = async (saleId, itemsUpdate) => {
  const notFoundSale = await getById(saleId);
  if (notFoundSale.type) return notFoundSale;

  const invalidQuantity = schema.validateQuantitys(itemsUpdate);
  if (invalidQuantity.type) return invalidQuantity;

  const notFoundProduct = await getProductsById(itemsUpdate);
  if (notFoundProduct.type) return notFoundProduct;

  const itemsUpdated = await Promise.all(itemsUpdate.map((item) =>
    saleModel.updateSale(saleId, item)));
  return { type: null, message: { saleId, itemsUpdated } };
};
  
module.exports = { getAll, getById, createSale, deleteSale, updateSale };