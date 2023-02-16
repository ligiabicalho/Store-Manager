const isRequired = require('../utils/isRequired');
const { productService } = require('../services');
const { mapError } = require('../utils/httpStatus');

const isRequiredName = (req, _res, next) => {
  console.log('validateName body', req.body);
  const { name } = req.body;
  isRequired(name, next, 'name');

  return next();
};

const validateExistProductId = async (req, _res, next) => {
  const { id } = req.params;
  console.log('id params', id);
  const { type, message } = await productService.getById(id);
    if (type) return next({ status: mapError(type), message });

  return next();
};

module.exports = { isRequiredName, validateExistProductId };
