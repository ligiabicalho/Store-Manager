const isRequired = require('../utils/isRequired');
const { productService } = require('../services');
const { mapError } = require('../utils/httpStatus');

const isRequiredQuantity = (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.quantity, next, 'quantity'));

return next();
};

const isRequiredAndExistProductId = async (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequired(item.productId, next, 'productId'));

  await Promise.all(body.map(async (item) => {
    const { type, message } = await productService.getById(item.productId);
    if (type) return next({ status: mapError(type), message });
  })); 

  return next();
};

module.exports = { isRequiredQuantity, isRequiredAndExistProductId };
