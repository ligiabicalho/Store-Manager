const isRequired = require('./isRequired');

const isRequiredQuantity = (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.quantity, next, 'quantity'));

return next();
};

const isRequiredProductId = async (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.productId, next, 'productId'));

  return next();
};

// Validate Exist Products: REGRA DE NEGÓCIO -> saleService

// const validateExistProducts = async (req, _res, next) => {
//   const items = req.body;

//   await Promise.all(items.map(async (item) => {
//       const { type, message } = await productService.getById(item.productId);
//       if (type) return next({ status: mapError(type), message });
//   })); 
//   return next();
// };

module.exports = { isRequiredQuantity, isRequiredProductId };
