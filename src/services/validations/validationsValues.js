const { idSchema, nameSchema, quantSchema } = require('./schemas');
const { productService } = require('../index');

const validateId = (id) => {
  const { error } = idSchema.validate({ id });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateNameProduct = (name) => { 
  const { error } = nameSchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

const validateQuantity = (quantity) => { 
  const { error } = quantSchema.validate({ quantity });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateQuantitys = (itemsSold) => { 
  let error = '';
  itemsSold.map((item) => {
    error = validateQuantity(item.quantity);
    return error;
  });
  if (error.type) return error;
  
  return { type: null, message: '' };
};

// não funciona chamando no server, so como middleware router. ??
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

module.exports = { validateId, validateNameProduct, validateQuantitys };