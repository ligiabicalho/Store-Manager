const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return camelize(allProducts); 
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
    );
  return camelize(product);
};

module.exports = { getAll, getById };