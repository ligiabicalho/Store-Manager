const { idSchema, nameSchema, quantSchema } = require('./schemas');

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

module.exports = { validateId, validateNameProduct, validateQuantity };