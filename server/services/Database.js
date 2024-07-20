const MySQL = require('promise-mysql2');
const CommonHelper = require('../helpers/CommonHelper');

const connectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || 'localhost',
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PASSWORD || '',
  database: process.env.MYSQL_CONFIG_DATABASE || 'store',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectionLimit: Number(process.env.MYSQL_CONN_LIMIT) || 0
});

const productTable = process.env.PHONEBOOK_TABLE || 'products';

const getProducts = async () => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const [rawResult] = await connection.query(`SELECT name,brand,price,stock FROM ${productTable} ORDER BY id ASC`);
    const result = Object.values(JSON.parse(JSON.stringify(rawResult)));

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getProducts', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getProducts', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getProduct = async (id) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `SELECT id,name,brand,price,stock FROM ${productTable} WHERE id = ?`;
    const values = [id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'getProduct', 'INFO'], {
      message: { timeTaken },
      result
    });

    return result;
  } catch (error) {
    CommonHelper.log(['Database', 'getProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const addProduct = async (name, brand, price, stock) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `INSERT INTO ${productTable} (name, brand, price, stock) VALUES (?, ?, ?, ?)`;
    const values = [name, brand, price, stock];
    await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'addProduct', 'INFO'], {
      message: { timeTaken }
    });
  } catch (error) {
    CommonHelper.log(['Database', 'addProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const editProduct = async (id, name, brand, price, stock) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `UPDATE ${productTable} SET name = ?, brand = ?, price = ?, stock = ?, updatedAt = NOW() WHERE id = ?`;
    const values = [name, brand, price, stock, id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'editProduct', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'editProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteProduct = async (id) => {
  let connection = null;
  try {
    const timeStart = process.hrtime();

    connection = connectionPool && (await connectionPool.getConnection());
    const query = `DELETE FROM ${productTable} WHERE id = ?`;
    const values = [id];
    const [result] = await connection.query(query, values);

    // Log Transaction
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Database', 'deleteProduct', 'INFO'], {
      message: { timeTaken }
    });
    return result?.affectedRows > 0;
  } catch (error) {
    CommonHelper.log(['Database', 'deleteProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, deleteProduct };
