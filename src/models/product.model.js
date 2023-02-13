const camelize = require('camelize');
const snakeize = require('snakeize');
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

const insert = async (product) => {
  // por ora, recebe apenas 1 dado, mas poderá escalar para mais.
  const column = Object.keys(snakeize(product)).join();
  console.log('product', product);
  console.log('column', column);

  const placeholder = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  console.log('placeholder', placeholder);
  console.log('values product', ...Object.values(product));
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${column}) VALUE (${placeholder})`,
    [...Object.values(product)],
  );

  return insertId;
};

module.exports = { getAll, getById, insert };