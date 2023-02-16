const { productService } = require('../services');
const { mapError, OK_STATUS, CREATED_STATUS, NO_CONTENT_STATUS } = require('../utils/httpStatus');

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

const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { type, message } = await productService.createProduct(name);
    if (type) return res.status(mapError(type)).json({ message });

    res.status(CREATED_STATUS).json(message);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const { type, message } = await productService.updateProduct(id, name);
    if (type) return res.status(mapError(type)).json({ message });

    res.status(OK_STATUS).json(message);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, message } = await productService.deleteProduct(id);
    if (type) return res.status(mapError(type)).json({ message });

    res.status(NO_CONTENT_STATUS).json(); // sem o json() quebra, pq??
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };