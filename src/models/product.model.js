const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return camelize(allProducts); // [{ id, name }, { id, name }]
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
    );
  return camelize(product); // { id, name }
};

const insertProduct = async (product) => { // { name }
  // por ora, recebe apenas 1 chave, mas poderá escalar para mais.
  const column = Object.keys(snakeize(product)).join();

  const placeholder = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${column}) VALUE (${placeholder})`,
    [...Object.values(product)],
  );
  const newProduct = await getById(insertId);

  return newProduct; // { id, name }
};

const getByName = async (productName) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [productName],
    );
  return camelize(product); // { id, name }
};

const updateProduct = async (productId, newName) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [newName, productId],
  );
  const newProduct = await getById(productId);
  return newProduct;
};

module.exports = { getAll, getById, insertProduct, updateProduct, getByName };