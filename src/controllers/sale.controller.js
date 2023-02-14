const { saleService } = require('../services');
const { mapError, CREATED_STATUS } = require('../utils/httpStatus');

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

module.exports = { createSale };