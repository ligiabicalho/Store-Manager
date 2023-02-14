const isRequered = require('../utils/isRequired');

  const validateProductField = (req, _res, next) => {
  const { name } = req.body;

  isRequered(name, next, 'name');

  return next();
};

module.exports = validateProductField;
