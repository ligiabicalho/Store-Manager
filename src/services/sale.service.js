const { saleModel } = require('../models');
const schema = require('./validations/validationsValues');
// const { productService } = require('.');

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

// const validateExistProducts = async (items) => {
//   console.log('exist validate', items);
//   const result = await Promise.all(items.map(async (item) => {
//   console.log('exist validate map', item);
//       const { type, message } = await productService.getById(item.productId);
//       if (type) return { status: type, message };
//   })); 
//   console.log('result', result);
//   return { type: null, message: '' };
// };

const createSale = async (itemsSold) => {
  const invalidQuantity = schema.validateQuantitys(itemsSold);
  if (invalidQuantity.type) return invalidQuantity;
  
  // não funciona chamando aqui no server, so como middleware router. ??
  // const notFoundProduct = validateExistProducts(itemsSold);
  // if (notFoundProduct.type) return notFoundProduct;

  const newSaleId = await saleModel.insertSale();

  const insertedSale = await Promise.all(itemsSold.map(async (item) => {
    await saleModel.insertSaleProducts(newSaleId, item);
    return item;
  }));
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

  // const notFoundProduct = schema.validateExistProducts(itemsUpdate);
  // if (notFoundProduct.type) return notFoundProduct;

  const itemsUpdated = await Promise.all(itemsUpdate.map(async (item) => {
    await saleModel.updateSale(saleId, item);
    return item;
  }));
  console.log('service up', saleId, itemsUpdated);
  return { type: null, message: { saleId, itemsUpdated } };
};
  
module.exports = { getAll, getById, createSale, deleteSale, updateSale };