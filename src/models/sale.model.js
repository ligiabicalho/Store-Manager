const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [all] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id 
    ORDER BY sale_id, product_id`,
  );
  return camelize(all); 
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id  
    WHERE s.id  = ?`,
    [saleId],
  );
  console.log('getById', camelize(sale));
  return camelize(sale);
};

const insertSaleProducts = async (saleId, itemsSold) => {
  try { 
    const columns = Object.keys(snakeize(itemsSold)).join(', ');
    const placeholders = Object.keys(itemsSold)
      .map((_key) => '?')
      .join(', ');

    const [result] = await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [saleId, ...Object.values(itemsSold)],
    );
    console.log('result:', result);
    return result;
  } catch (err) {
    console.error(`Erro ao inserir em sales_products: ${err.message}`);
  }
};

const insertSale = async () => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
    );
    return insertId;
  } catch (err) {
    console.error(`Erro ao inserir em sales_products: ${err.message}`);
  }
};

module.exports = { getAll, getById, insertSale, insertSaleProducts };