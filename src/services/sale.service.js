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
  
module.exports = { getAll, getById, createSale, deleteSale };