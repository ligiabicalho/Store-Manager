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

const validateQuantitys = (itemsSold) => { 
  let error = '';
  itemsSold.map((item) => {
    error = validateQuantity(item.quantity);
    return error;
  });
  if (error.type) return error;
  
  return { type: null, message: '' };
};

  /* VALIDATE EXIST PRODUCT / getProductsById:
  -não funciona chamando neste arquivo, apenas no saleSales, pq ?? 
    -não é um schema, está validando dados do banco de dados!
    -o productService importa tb o schema, isso gera um tipo de "loop"/dependência q não deixa o arquivo terminar de ser criado, desse modo productService.getById 'is not a function'
  "Função recursiva" -  Resolvido com ajuda do Zambelli */

//   const validateExistProducts = async (items) => {
//   const errors = await Promise.all(items.map(async (item) => {
//     const notFound = await productService.getById(item.productId); // retorna { type, message }
//     if (notFound.type) return 'error';
//   }));

//   if (errors.some((e) => e === 'error')) return { type: 'NOT_FOUND', message: 'Product not found' };
//   return { type: null, message: '' };
// };

module.exports = { validateId, validateNameProduct, validateQuantitys };