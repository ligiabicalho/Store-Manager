const { productService } = require('../services');
const { mapError, OK_STATUS } = require('../utils/httpStatus');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAll();

  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  console.log('controller type', type, mapError(type), message);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

module.exports = { getAllProducts, getProduct };