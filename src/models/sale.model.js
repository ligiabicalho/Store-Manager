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
  return camelize(sale); // retorna [{date, productId, quantity}]
};

const insertSaleProducts = async (saleId, itemsSold) => {
  try { 
    const columns = Object.keys(snakeize(itemsSold)).join(', '); // pra usar assim, tem q ter boa validação.
    const placeholders = Object.keys(itemsSold)
      .map((_key) => '?')
      .join(', ');

    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [saleId, ...Object.values(itemsSold)],
    );
    // INSERT retorna obj com dados da execução, dentre eles chave inserId e affectedRows.
    const newSaleProducts = getById(saleId);
    return newSaleProducts; 
  } catch (err) {
    console.error(`Erro ao inserir na tabela sales_products: ${err.message}`);
  }
};

const insertSale = async () => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
    );
    return insertId;
  } catch (err) {
    console.error(`Erro ao inserir na tabela sales: ${err.message}`);
  }
};

const deleteSale = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
};

const updateSale = async (saleId, updateItem) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ?  WHERE sale_id = ? AND product_id = ?',
    [updateItem.quantity, saleId, updateItem.productId],
  );
  const upSale = await getById(saleId);
  return upSale;
};

module.exports = { getAll, getById, insertSale, insertSaleProducts, deleteSale, updateSale };