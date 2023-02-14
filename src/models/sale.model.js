const snakeize = require('snakeize');
const connection = require('./connection');

const itemsSoldTest = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertSaleProducts = async (saleId, itemsSold) => {
  try { 
    const columns = Object.keys(snakeize(itemsSold)).join(', ');
    const placeholders = Object.keys(itemsSold)
      .map((_key) => '?')
      .join(', ');

    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [saleId, ...Object.values(itemsSold)],
    );
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

module.exports = { insertSale, insertSaleProducts };