const isRequired = require('../utils/isRequired');

const isRequiredName = (req, _res, next) => {
  const { name } = req.body;
  isRequired(name, next, 'name');

  return next();
};

// por ser regra de negócio, melhor q esteja no service.
// const validateExistProductId = async (req, _res, next) => {
//   const { id } = req.params;
//   const { type, message } = await productService.getById(id);
//     if (type) return next({ status: mapError(type), message });

//   return next();
// };

module.exports = { isRequiredName };
