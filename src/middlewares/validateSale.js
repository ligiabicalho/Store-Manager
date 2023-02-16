const isRequired = require('../utils/isRequired');
const { productService } = require('../services');
const { mapError } = require('../utils/httpStatus');

const isRequiredQuantity = (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.quantity, next, 'quantity'));

return next();
};

const isRequiredProductId = async (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.productId, next, 'productId'));

  // por ser regra de negócio, melhor q esteja no service. ?
  // await Promise.all(body.map(async (item) => {
  //   const { type, message } = await productService.getById(item.productId);
  //   if (type) return next({ status: mapError(type), message });
  // })); 

  return next();
};

// não roda se for uma validação no service. ?
const validateExistProducts = async (req, _res, next) => {
  const items = req.body;

  await Promise.all(items.map(async (item) => {
      const { type, message } = await productService.getById(item.productId);
      if (type) return next({ status: mapError(type), message });
  })); 
  return next();
};

module.exports = { isRequiredQuantity, isRequiredProductId, validateExistProducts };
