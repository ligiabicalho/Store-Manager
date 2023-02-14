const isRequered = require('../utils/isRequired');

const validateQuantity = (req, _res, next) => {
  const { body } = req;
  body.map((item) => isRequered(item.quantity, next, 'quantity'));

return next();
};

module.exports = { validateQuantity };
