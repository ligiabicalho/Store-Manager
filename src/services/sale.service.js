const { saleModel } = require('../models');
const schema = require('./validations/validationsValues');

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
  
module.exports = { createSale };