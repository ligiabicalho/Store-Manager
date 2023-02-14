const { saleService } = require('../services');
const { mapError, OK_STATUS, CREATED_STATUS } = require('../utils/httpStatus');

const getAllSales = async (_req, res) => {
  const { type, message } = await saleService.getAll();

  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(OK_STATUS).json(message);
};

const createSale = async (req, res, next) => {
  try {
    const itemsSold = req.body;
    const { type, message } = await saleService.createSale(itemsSold);
    if (type) return res.status(mapError(type)).json({ message });

    res.status(CREATED_STATUS).json(message);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllSales, getSale, createSale };