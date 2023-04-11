const isRequired = require('./isRequired');

const isRequiredName = (req, _res, next) => {
  const { name } = req.body;
  isRequired(name, next, 'name');

  return next();
};

module.exports = { isRequiredName };
