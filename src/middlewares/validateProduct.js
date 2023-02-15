const isRequered = require('../utils/isRequired');
const { productService } = require('../services');
const { mapError } = require('../utils/httpStatus');

const validateName = (req, _res, next) => {
  console.log('validateName body', req.body);
  const { name } = req.body;
  isRequered(name, next, 'name');

  return next();
};

const validateProductId = async (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequered(item.productId, next, 'productId'));

  await Promise.all(body.map(async (item) => {
    const { type, message } = await productService.getById(item.productId);
    if (type) return next({ status: mapError(type), message });
  })); 

  return next();
};

module.exports = { validateName, validateProductId };
