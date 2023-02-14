const { saleModel } = require('../models');
const schema = require('./validations/validationsValues');

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

const createSale = async (itemsSold) => {
  let error = '';
  itemsSold.map((item) => {
    error = schema.validateQuantity(item.quantity);
    return error;
  });
  if (error.type) return error;
  
  const id = await saleModel.insertSale();
  await Promise.all(itemsSold.map((item) => saleModel.insertSaleProducts(id, item))); 

  return { type: null, message: { id, itemsSold } };
};
  
module.exports = { getAll, getById, createSale };