const Boom = require('boom');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');

const getProducts = async () => {
  try {
    const data = await Database.getProducts();
    return {
      count: data.length,
      list: data
    };
  } catch (error) {
    CommonHelper.log(['Product Helper', 'getProducts', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getProduct = async (req) => {
  const id = req.params.id;
  try {
    const product = await Database.getProduct(id);
    if (product.length === 0) {
      return Boom.notFound(`Product with id ${id} not found `);
    }
    return product;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'getProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const addProduct = async (req) => {
  const { name, brand, price, stock } = req.body;
  try {
    await Database.addProduct(name, brand, price, stock);
    return `Added '${name}' , '${brand}' , '${price}' , '${stock}' to product`;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'addProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const editProduct = async (req) => {
  const id = req.params.id;
  const { name, brand, price, stock } = req.body;
  try {
    const product = await Database.editProduct(id, name, brand, price, stock);
    if (!product) {
      return Boom.notFound(`Product with id ${id} not found `);
    }
    return `Edited '${name}' , '${brand}' , '${price}' , '${stock}' to product`;
  } catch (error) {
    CommonHelper.log(['Product Helper', 'editProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const deleteProduct = async (req) => {
  try {
    const product = await Database.deleteProduct(req.params.id);
    if (!product) {
      return Boom.notFound(`Product with id ${req.params.id} not found `);
    }
    return `Delete id ${req.params.id} successfully`;
  } catch (error) {
    CommonHelper.log(['PhoneBook Helper', 'deleteProduct', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct
};
