const { productService } = require('../services');
const { mapError, OK_STATUS, CREATED_STATUS } = require('../utils/httpStatus');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAll();

  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(CREATED_STATUS).json(message);
};

module.exports = { getAllProducts, getProduct, createProduct };